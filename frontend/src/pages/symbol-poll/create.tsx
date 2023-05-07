import MainBackground from '@/components/atom/MainBackground';
import { PageTitle } from '@/components/atom/Titles';
import Header from '@/components/moleculs/Header';
import Footer from '@/components/moleculs/Footer';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import { useTheme } from '@mui/material/styles';
import Toolbar from '@mui/material/Toolbar';
import FormLabel from '@mui/material/FormLabel';
import useMediaQuery from '@mui/material/useMediaQuery';
import { GetStaticProps, NextPage } from 'next/types';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { useState, useEffect } from 'react';
import { IconButton } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import { LocalizationProvider, DateTimePicker } from '@mui/x-date-pickers';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns'
import { getActivePublicKey } from 'sss-module';
import { SymbolService } from '../../services/symbolService';

interface Props {}

interface PollData {
  hash: string | undefined;
  title: string | undefined;
  description: string | undefined;
  options: string | undefined;
  publicKey: string | undefined;
  dateOfEnding: string | undefined;
  startHeight: number | undefined;
}

const CreateSymbolPoll: NextPage<Props> = ({}) => {  
  const [options, setOptions] = useState([{ name: '' }]);
  const [title, setTitle] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [dateOfEnding, setDateOfEnding] = useState<Date>(new Date());
  const [showHash, setShowHash] = useState(false);
  const [hash, setHash] = useState<string>("");
  const [warningText, setWarningText] = useState<string>("");
  const [currentUTCDate, setCurrentUTCDate] = useState<Date>(new Date());
  const [sevenDaysLaterUTCDate, setSevenDaysLaterUTCDate] = useState<Date>(new Date());
  const [symbolService, setSymbolService] = useState<SymbolService>();
  
  useEffect(() => {
    setCurrentUTCDate(new Date(Date.now() + new Date().getTimezoneOffset() * 60 * 1000));
    setSevenDaysLaterUTCDate(new Date(new Date(Date.now() + new Date().getTimezoneOffset() * 60 * 1000).setDate(new Date(Date.now() + new Date().getTimezoneOffset() * 60 * 1000).getDate() + 7)));
    const initializeSymbolService = async () => {
      const service = new SymbolService();
      await service.init();
      setSymbolService(service);
    };

    initializeSymbolService();
  }, []);

  const handleTitleChange = (title: string) => {
    setTitle(title);
  }
  const handleDescriptionChange = (description: string) => {
    setDescription(description);
  }
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

  const handleFormSubmit = async () => {
    try {
      if(dateOfEnding > sevenDaysLaterUTCDate || dateOfEnding < currentUTCDate) {
        throw new Error("Poll can be opened only between 7 days from now and now.");
      }
      options.forEach(option=>{
        option.name
      })
      const optionStrings = options
        .filter(option => option.name)
        .map(option => (option.name));

      const pollData: PollData = {
        hash: undefined,
        startHeight: undefined,
        title,
        description,
        options: optionStrings.join(","),
        publicKey: getActivePublicKey(),
        dateOfEnding: (new Date(dateOfEnding.getTime() - new Date().getTimezoneOffset() * 60 * 1000)).toISOString(),
      }
      
      if (symbolService === undefined) throw new Error("symbolService is undefined");
      const generatedHash = await symbolService.createPollTransaction(JSON.stringify(pollData));
      pollData.hash = generatedHash;
      pollData.startHeight = await symbolService.getCurrentHeight();
      setHash(process.env.NEXT_PUBLIC_HOSTING_URL + "/ja/symbol-poll/poll?&hash=" + pollData.hash);
      setShowHash(true);
      
      const postRequestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ data: pollData })
      };
      const apiUrl = process.env.NEXT_PUBLIC_API_URL + "/api/polls";
      
      const postPollResponse = await fetch(apiUrl, postRequestOptions);
      const responseJson = await postPollResponse.json();
      console.log(responseJson.data);
      const urlForCronJob = process.env.NEXT_PUBLIC_API_URL + "/api/set-open-poll";
      const responseData = responseJson.data;
      const pollAttributes = responseData.attributes;
      const targetDate = new Date(pollAttributes.dateOfEnding);
      const utcCurrentDate = new Date(Date.now() + new Date().getTimezoneOffset() * 60 * 1000);
  
      const requestOptionsForCronJob = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          id: responseData.id,
          hash: pollAttributes.hash,
          startHeight: pollAttributes.startHeight,
          options: pollAttributes.options.split(","),
          time: targetDate.getTime() - utcCurrentDate.getTime()
        })
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
        <Container maxWidth='lg' style={{ height: '100%' }}>
          {/* Header section */}
          <section>
            <MainBackground />
            <PageTitle>Create a New Poll</PageTitle>
            <Grid container spacing={3}>
              <Grid item xs={12}>
                <TextField
                  label='Title'
                  onChange={event => handleTitleChange(event.target.value)}
                  fullWidth />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  label='Description'
                  onChange={event => handleDescriptionChange(event.target.value)}
                  fullWidth multiline rows={4}/>
              </Grid>
            </Grid>
            <Grid container spacing={2} style={{ marginTop: '10px', marginBottom: '10px' }} >
              <FormLabel style={{ paddingLeft: '16px' }} >Options</FormLabel>
                {options.map((option, index) => (
                  <Grid item xs={12} md={12} key={index}>
                    <Grid container spacing={2} alignItems="flex-end">
                      <Grid item xs={3}>
                        <TextField
                          label={`Option ${index + 1} name`}
                          value={option.name}
                          fullWidth
                          onChange={event => handleOptionChange(index, 'name', event.target.value)}
                        />
                      </Grid>
                    <Grid item xs={1}>
                      <IconButton
                        onClick={() => handleRemoveOption(index)}
                        disabled={options.length === 1}
                      >
                        <DeleteIcon />
                      </IconButton>
                    </Grid>
                  </Grid>
                </Grid>
              ))}
            </Grid>
            <Grid item xs={12}>
              <Button onClick={handleAddOption} style={{ marginRight: '10px' }}>Add Option</Button>
            </Grid>
            <Grid container spacing={3} style={{ marginTop: '20px', marginBottom: '10px' }} >
              <Grid item xs={12}>
                <LocalizationProvider dateAdapter={AdapterDateFns}>
                  <DateTimePicker
                    label="Date of ending"
                    value={dateOfEnding}
                    onChange={handleOpenDateChange}
                    minDateTime={currentUTCDate}
                    maxDateTime={sevenDaysLaterUTCDate}
                    sx={{ width: "100%", maxWidth: "300px" }}
                  />
                </LocalizationProvider>
              </Grid>
            </Grid>
            <Grid item xs={12} style={{ marginTop: '10px' }}>
              <Button onClick={handleFormSubmit}>Submit</Button>
            </Grid>
            <div style={{ color: "#FF0000", padding: "20px", fontSize: "20px"}}>{warningText}</div>
            <div id="hash" style={{ display: showHash ? "block" : "none", marginTop: '40px', marginBottom: '10px' }}>
              <Grid item xs={12}>
                <TextField
                  label="Poll URL"
                  variant="outlined"
                  fullWidth
                  value={hash}
                  disabled
                />
              </Grid>
            </div>
          </section>
          <section style={{ marginTop: '100px' }}>
            <Footer />
          </section>
        </Container>
      </div>
    </>
  );
};

const getStaticProps: GetStaticProps<Props> = async ({ locale, defaultLocale }) => {
  return {
    props: {
    locale: locale || defaultLocale || 'en',
    },
  };
};

export { getStaticProps };
export default CreateSymbolPoll;
