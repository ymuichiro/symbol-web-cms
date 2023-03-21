import MainBackground from '@/components/atom/MainBackground';
import { PageTitle, SectionTitle, SubTitle } from '@/components/atom/Titles';
import Header from '@/components/moleculs/Header';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import { useTheme } from '@mui/material/styles';
import Toolbar from '@mui/material/Toolbar';
import FormLabel from '@mui/material/FormLabel';
import useMediaQuery from '@mui/material/useMediaQuery';
import { GetStaticProps, NextPage } from 'next/types';
import Footer from '@/components/moleculs/Footer';
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
  openPollDate: Date | undefined;
  startHeight: number | undefined;
}

const SymbolPollCreate: NextPage<Props> = ({}) => {
  const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.between('xs', 'md'));
  const xssMatches = useMediaQuery('@media screen and (min-width:400px)');
  const [options, setOptions] = useState([{ name: '' }]);
  const [title, setTitle] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [openDate, setOpenDate] = useState<Date>(new Date());
  const [showHash, setShowHash] = useState(false);
  const [hash, setHash] = useState<string>("");
  const [warningText, setWarningText] = useState<string>("");
  const [currentUTCDate, setCurrentUTCDate] = useState<Date>(new Date());
  const [symbolService, setSymbolService] = useState<SymbolService>();
  
  useEffect(() => {
    setCurrentUTCDate(new Date(Date.now() + new Date().getTimezoneOffset() * 60 * 1000));
    const initSymbolService = async () => {
      const service = new SymbolService();
      await service.init();
      setSymbolService(service);
    };

    initSymbolService();
  }, []);

  const handleTitle = (title: string) => {
    setTitle(title);
  }
  const handleDescription = (description: string) => {
    setDescription(description);
  }
  const handleAddItem = () => {
    setOptions([...options, { name: '' }]);
  };

  const handleRemoveItem = (index: number) => {
    const newItems = [...options];
    newItems.splice(index, 1);
    setOptions(newItems);
  };

  const handleItemChange = (index: number, field: 'name', name: string) => {
    const newItems = [...options];
    newItems[index][field] = name;
    setOptions(newItems);
  };

  const handleSubmit = async () => {
    try {
      options.forEach(option=>{
        option.name
      })
      const itemObjects = options
        .filter(option => option.name)
        .map(option => (option.name));
      let str = "";
      for(let i = 0; i < itemObjects.length; i++){
        str += i == 0 ? itemObjects[i] : "," + itemObjects[i];
      }
      
      const pollData: PollData = {
        hash: undefined,
        startHeight: undefined,
        title,
        description,
        options: str,
        publicKey: getActivePublicKey(),
        openPollDate: openDate,
      }
      if(symbolService==undefined) throw new Error("symbolService is undefind");
      const hash = await symbolService.createPollTransaction(JSON.stringify(pollData));
      pollData.hash = hash;
      pollData.startHeight = await symbolService.getCurrentHeight();
      setHash(process.env.NEXT_PUBLIC_HOSTING_URL+"/ja/symbol-poll/poll?&hash="+pollData.hash);
      setShowHash(true);
      
      const requestOptions ={
        method: 'POST',
        headers:{'Content-Type': 'application/json'},
        body: JSON.stringify({ data: pollData})
      };
      const url = process.env.NEXT_PUBLIC_API_URL + "/api/polls";
      
      const postPollResponce = await fetch(url,requestOptions)
      const responseJson = await postPollResponce.json();
      console.log(responseJson.data)
      const urlForCronJob = process.env.NEXT_PUBLIC_API_URL + "/api/set-open-poll";
      const res = responseJson.data;
      const attributes = res.attributes;
      const targetDate = new Date(attributes.openPollDate);      
      const utcCurrentDate = new Date(Date.now() + new Date().getTimezoneOffset() * 60 * 1000)

      const requestOptionsForCronJob ={
        method: 'POST',
        headers:{'Content-Type': 'application/json'},
        body: JSON.stringify({
          id: res.id,
          hash: attributes.hash,
          startHeight: attributes.startHeight,
          options: attributes.options.split(","),
          time: targetDate.getTime() - utcCurrentDate.getTime()
        })
      };

      await fetch(urlForCronJob,requestOptionsForCronJob);
    } catch (e: any) {
      setWarningText(e.message);
      console.error(e.message);
    }
  };

  const handleChangeOpenDate = (newValue: Date | null) => {
    if(newValue == null) return;
    setOpenDate(newValue)
  }

  return (
    <>
      <Header />
      <Toolbar style={{ marginTop: '20px' }} />
      <div style={{ marginBottom: '5vh' }}>
        <Container maxWidth='lg' style={{ height: '100%' }}>
          {/* ヘッダーセクション */}
          <section>
            <MainBackground />
            <PageTitle>Create a New Poll</PageTitle>
            <Grid container spacing={3}>
              <Grid item xs={12}>
                <TextField 
                  label='Title' 
                  onChange={event => handleTitle(event.target.value)}
                  fullWidth />
              </Grid>
              <Grid item xs={12}>
                <TextField 
                  label='Description'
                  onChange={event => handleDescription(event.target.value)}
                  fullWidth multiline rows={4}/>
              </Grid>
            </Grid>
            <Grid container spacing={2} style={{ marginTop: '10px', marginBottom: '10px' }} >
              <FormLabel style={{ paddingLeft: '16px' }} >options</FormLabel>
              {options.map((option, index) => (
                <Grid item xs={12} md={12} key={index}>
                  <Grid container spacing={2} alignItems="flex-end">
                    <Grid item xs={3}>
                      <TextField
                        label={`Option ${index + 1} name`}
                        value={option.name}
                        fullWidth
                        onChange={event => handleItemChange(index, 'name', event.target.value)}
                      />
                    </Grid>
                    <Grid item xs={1}>
                      <IconButton
                        onClick={() => handleRemoveItem(index)}
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
              <Button onClick={handleAddItem} style={{ marginRight: '10px' }}>Add Option</Button>
            </Grid>
            <Grid container spacing={3} style={{ marginTop: '20px', marginBottom: '10px' }} >
              <Grid item xs={12}>
              <LocalizationProvider dateAdapter={AdapterDateFns}>
              <DateTimePicker
                label="Open poll date"
                value={openDate}
                onChange={handleChangeOpenDate}
                minDateTime={currentUTCDate}
                sx={{ width: "100%", maxWidth: "300px" }}
              />
              </LocalizationProvider>
              </Grid>
            </Grid>
            <Grid item xs={12} style={{ marginTop: '10px' }}>
              <Button onClick={handleSubmit}>Submit</Button>
            </Grid>
            <div style={{ color: "#FF0000", padding: "20px", fontSize: "20px"}}>{warningText}</div>

            <div id = "hash" style={{ display: showHash ? "block" : "none", marginTop: '40px', marginBottom: '10px' }}>
            <Grid item xs={12}>
              <TextField
                label="poll url"
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
export default SymbolPollCreate;
