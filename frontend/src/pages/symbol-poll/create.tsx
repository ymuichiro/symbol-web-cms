import MainBackground from '@/components/atom/MainBackground';
import { PageTitle } from '@/components/atom/Titles';
import Footer from '@/components/moleculs/Footer';
import Header from '@/components/moleculs/Header';
import { SymbolService } from '@/services/symbolService';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import IconButton from '@mui/material/IconButton';
import InputAdornment from '@mui/material/InputAdornment';
import TextField from '@mui/material/TextField';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import { DateTimePicker, LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import type { GetStaticProps, NextPage } from 'next/types';
import { useEffect, useState } from 'react';
import { MdDelete } from 'react-icons/md';
import { getActivePublicKey } from 'sss-module';
import FormControl from '@mui/material/FormControl';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import Select, { SelectChangeEvent } from '@mui/material/Select';

interface PollData {
  hash: string | undefined;
  title: string | undefined;
  description: string | undefined;
  options: string | undefined;
  publicKey: string | undefined;
  dateOfEnding: string | undefined;
  startHeight: number | undefined;
  specificMosaicId: string | undefined;
}

const CreateSymbolPoll: NextPage = ({}) => {
  const [options, setOptions] = useState([{ name: '' }]);
  const [title, setTitle] = useState<string>('');
  const [description, setDescription] = useState<string>('');
  const [dateOfEnding, setDateOfEnding] = useState<Date>(new Date());
  const [showHash, setShowHash] = useState(false);
  const [hash, setHash] = useState<string>('');
  const [warningText, setWarningText] = useState<string>('');
  const [currentUTCDate, setCurrentUTCDate] = useState<Date>(new Date());
  const [sevenDaysLaterUTCDate, setSevenDaysLaterUTCDate] = useState<Date>(new Date());
  const [symbolService, setSymbolService] = useState<SymbolService>();
  const [onSpecificMosaic, setOnSpecificMosaic] = useState<string>("OFF");
  const [specificMosaicId, setSpecificMosaicId] = useState<string>("");
  const handleOnSpecificMosaicChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setOnSpecificMosaic((event.target as HTMLInputElement).value)
  };
  const [ showSpecificMosaicList, setShowSpecificMosaicList ] = useState<boolean>(false);
  const [ mosaicIds, setMosaicIds] = useState<string[]>(['a', 'b', 'c']);

  useEffect(() => {
    if(onSpecificMosaic === "ON") {
      setShowSpecificMosaicList(true);
    } else {
      setShowSpecificMosaicList(false);
    }
  }, [onSpecificMosaic]);

  useEffect(() => {
    setCurrentUTCDate(new Date(Date.now() + new Date().getTimezoneOffset() * 60 * 1000));
    setSevenDaysLaterUTCDate(
      new Date(
        new Date(Date.now() + new Date().getTimezoneOffset() * 60 * 1000).setDate(
          new Date(Date.now() + new Date().getTimezoneOffset() * 60 * 1000).getDate() + 7
        )
      )
    );
    const initializeSymbolService = async () => {
      const service = new SymbolService();
      await service.init();
      const mosaicIds = await service.getMosaics();
      setSpecificMosaicId(mosaicIds[0]);
      setMosaicIds(mosaicIds);
      setSymbolService(service);
    };
    setTimeout(() => {
      initializeSymbolService();
    }, 2000);
  }, []);

  const handleTitleChange = (title: string) => {
    setTitle(title);
  };
  const handleDescriptionChange = (description: string) => {
    setDescription(description);
  };
  const handleAddOption = () => {
    setOptions([...options, { name: '' }]);
  };

  const handleRemoveOption = (index: number) => {
    const newOptions = [...options];
    newOptions.splice(index, 1);
    setOptions(newOptions);
  };

  const handleOptionChange = (index: number, field: 'name', name: string) => {
    const newOptions = [...options];
    newOptions[index][field] = name;
    setOptions(newOptions);
  };

  const handleMosiacIdChange = (event: SelectChangeEvent<unknown>) => {
    const selectedValue = event.target.value as string;
    setSpecificMosaicId(selectedValue);
  };

  const handleFormSubmit = async () => {
    try {
      if(dateOfEnding > sevenDaysLaterUTCDate || dateOfEnding < currentUTCDate) {
        throw new Error('Poll can be opened only between 7 days from now and now.');
      }
      options.forEach((option) => {
        option.name;
      });
      const optionStrings = options.filter((option) => option.name).map((option) => option.name);

      const pollData: PollData = {
        hash: undefined,
        startHeight: undefined,
        title,
        description,
        options: optionStrings.join(','),
        publicKey: getActivePublicKey(),
        dateOfEnding: (new Date(dateOfEnding.getTime() - new Date().getTimezoneOffset() * 60 * 1000)).toISOString(),
        specificMosaicId: onSpecificMosaic === "ON" ? specificMosaicId : undefined,
      }
      
      if (symbolService === undefined) throw new Error("symbolService is undefined");
      const generatedHash = await symbolService.createPollTransaction(JSON.stringify(pollData));
      pollData.hash = generatedHash;
      pollData.startHeight = await symbolService.getCurrentHeight();
      setHash(process.env.NEXT_PUBLIC_HOSTING_URL + '/ja/symbol-poll/poll?&hash=' + pollData.hash);
      setShowHash(true);

      const postRequestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ data: pollData }),
      };
      const apiUrl = process.env.NEXT_PUBLIC_API_URL + '/api/polls';

      const postPollResponse = await fetch(apiUrl, postRequestOptions);
      const responseJson = await postPollResponse.json();
      const urlForCronJob = process.env.NEXT_PUBLIC_API_URL + '/api/set-open-poll';
      const responseData = responseJson.data;
      const pollAttributes = responseData.attributes;
      
      const targetDate = new Date(pollAttributes.dateOfEnding);
      const utcTime = targetDate.toISOString();
      const timestamp = new Date(utcTime).getTime() + new Date().getTimezoneOffset() * 60 * 1000;
      const utcCurrentDate = new Date(Date.now() + new Date().getTimezoneOffset() * 60 * 1000);
    
      const requestOptionsForCronJob = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          id: responseData.id,
          hash: pollAttributes.hash,
          startHeight: pollAttributes.startHeight,
          options: pollAttributes.options.split(','),
          time: timestamp - utcCurrentDate.getTime(),
          specificMosaicId: pollAttributes.specificMosaicId,
        }),
      };

      await fetch(urlForCronJob, requestOptionsForCronJob);
    } catch (e: any) {
      setWarningText(e.message);
      console.error(e.message);
    }
  };

  const handleOpenDateChange = (newValue: Date | null) => {
    if (newValue === null) return;
    setDateOfEnding(newValue);
  }

  return (
    <>
      <Header />
      <Toolbar style={{ marginTop: '20px' }} />
      <div style={{ marginBottom: '5vh' }}>
        <Container maxWidth='md' style={{ height: '100%' }}>
          {/* Header section */}
          <section>
            <MainBackground />
            <PageTitle>Create a New Poll</PageTitle>
            <Card style={{ backgroundColor: 'rgba(0, 0, 0, 0.5)' }}>
              <CardContent style={{ marginTop: '2rem', marginBottom: '2rem' }}>
                <Grid container spacing={2}>
                  <Grid item xs={12}>
                    <Typography>Info</Typography>
                  </Grid>
                  <Grid item xs={12}>
                    <TextField label='Title' onChange={(event) => handleTitleChange(event.target.value)} fullWidth />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      label='Description'
                      onChange={(event) => handleDescriptionChange(event.target.value)}
                      fullWidth
                      multiline
                      rows={4}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <Typography style={{ marginTop: '1rem' }}>Options</Typography>
                  </Grid>
                  {options.map((option, index) => (
                    <Grid item xs={12} md={12} key={index}>
                      <TextField
                        label={`Option ${index + 1} name`}
                        value={option.name}
                        fullWidth
                        onChange={(event) => handleOptionChange(index, 'name', event.target.value)}
                        InputProps={{
                          endAdornment: (
                            <InputAdornment position='end'>
                              <IconButton onClick={() => handleRemoveOption(index)} disabled={options.length === 1}>
                                <MdDelete />
                              </IconButton>
                            </InputAdornment>
                          ),
                        }}
                      />
                    </Grid>
                  ))}
                  <Grid item xs={12}>
                    <div style={{ width: '100%', display: 'flex', justifyContent: 'flex-end' }}>
                      <Button onClick={handleAddOption}>Add Option</Button>
                    </div>
                  </Grid>
                  <Grid item xs={12}>
                    <div style={{ marginTop: '1rem' }}>
                      <LocalizationProvider dateAdapter={AdapterDateFns}>
                        <DateTimePicker
                          label='Date of ending'
                          value={dateOfEnding}
                          onChange={handleOpenDateChange}
                          minDateTime={currentUTCDate}
                          maxDateTime={sevenDaysLaterUTCDate}
                          sx={{ width: '100%' }}
                        />
                      </LocalizationProvider>
                    </div>
                  </Grid>
                  <Grid item xs={12}>
                    <Typography style={{ marginTop: '1rem' }}>モザイク投票</Typography>
                    <div style={{ marginTop: '1rem' }}>
                      <FormControl>
                        <RadioGroup
                          row
                          value={onSpecificMosaic.toString()}
                          onChange={handleOnSpecificMosaicChange}
                        >
                          <FormControlLabel value="ON" control={<Radio />} label="ON" />
                          <FormControlLabel value="OFF" control={<Radio />} label="OFF" />
                        </RadioGroup>
                      </FormControl>
                    </div>
                  </Grid>
                  <Grid item xs={12} style={{display: showSpecificMosaicList ? "block" : "none"}}>
                    <FormControl fullWidth>
                      <InputLabel id="mosaicId">Mosaic ID</InputLabel>
                      <Select
                        label="MosaiID"
                        style={{width: '100%'}}
                        value={specificMosaicId}
                        onChange={handleMosiacIdChange}
                      >
                        {mosaicIds.map((id, index) => (
                          <MenuItem value={id} key={index}>{id}</MenuItem>
                        ))}
                      </Select>
                    </FormControl>
                    <div style={{marginTop: '1rem'}}>※モザイク投票機能をONにすると指定モザイクでの集計を行います。インポータンスは考慮されません。</div>
                  </Grid>
                  <Grid item xs={12}>
                    <div style={{ display: 'flex', justifyContent: 'center', width: '100%', marginTop: '2rem' }}>
                      <Button fullWidth onClick={handleFormSubmit} style={{ maxWidth: '600px' }}>
                        Submit
                      </Button>
                    </div>
                  </Grid>
                  <div style={{ color: '#FF0000', padding: '20px', fontSize: '20px' }}>{warningText}</div>
                  <Grid item xs={12} style={{display: showHash ? 'block' : 'none'}} id='hash'>
                    <TextField label='Poll URL' variant='outlined' fullWidth value={hash} disabled />
                  </Grid>
                </Grid>
              </CardContent>
            </Card>
          </section>
          <section style={{ marginTop: '100px' }}>
            <Footer />
          </section>
        </Container>
      </div>
    </>
  );
};

const getStaticProps: GetStaticProps = async ({ locale, defaultLocale }) => {
  return {
    props: {
      locale: locale || defaultLocale || 'en',
    },
  };
};

export { getStaticProps };
export default CreateSymbolPoll;
