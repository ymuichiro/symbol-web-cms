import MainBackground from '@/components/atom/MainBackground';
import { PageTitle } from '@/components/atom/Titles';
import Header from '@/components/moleculs/Header';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import { useTheme } from '@mui/material/styles';
import Toolbar from '@mui/material/Toolbar';
import { GetStaticProps, NextPage } from 'next/types';
import Image from 'next/image';
import Button from '@mui/material/Button';
import Footer from '@/components/moleculs/Footer';
import { useRouter } from 'next/router';
import TextField from '@mui/material/TextField';
import { useState, useEffect } from 'react';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import { VoteType, SymbolService } from '../../services/symbolService';
import { tr } from 'date-fns/locale';

const DEFAULT_QR_CODE_IMAGE = '/assets/img/symbol-logo-default-cover.webp';

interface Props {}

const SymbolPoll: NextPage<Props> = ({}) => {
  const theme = useTheme();
  const router = useRouter();
  
  const [hash, setHash] = useState<string | null>(null);
  const handleHashChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setHash(event.target.value);
  };

  const [showPollData, setShowPollData] = useState(false);
  const handleClick = () => {
    setShowPollData(true);
  }

  const [pollTitle, setPollTitle] = useState<string>("");
  const [voteType, setVoteType] = useState<string>("SSS");
  const [qrCodeImage, setQrCodeImage] = useState<string>(DEFAULT_QR_CODE_IMAGE);
  const [showQrCode, setShowQrCode] = useState<boolean>(false);
  const handleVoteTypeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setVoteType((event.target as HTMLInputElement).value)
  };

  const [pollDescription, setPollDescription] = useState<string>("");
  const [pollOptions, setPollOptions] = useState([{ name: '' }]);
  const [dateOfEnding, setDateOfEnding] = useState<string>("");
  const [selectedOption, setSelectedOption] = useState<string>("未選択");
  const [warningText, setWarningText] = useState<string>("");
  const [symbolService, setSymbolService] = useState<SymbolService>();

  const [canCreateTransaction, setCanCreateTransaction] = useState(false);

  useEffect(() => {
    const { hash } = router.query;
    if (typeof hash === 'string') {
      if(hash.length == 64) {
        setHash(hash);
      }
    }
  }, [router.query]);

  useEffect(() => {
    if (hash) {
      handleSubmit()
    }
  }, [hash]);

  useEffect(() => {
    const initSymbolService = async () => {
      const service = new SymbolService();
      await service.init();
      setSymbolService(service);
    };
    initSymbolService();
  }, []);
  
  const selectOption = (option: string) => {
    setSelectedOption(option);
  }

  function validate() {
    if(selectedOption == "未選択") {
      setWarningText("選択されていません");
      return false;
    };
    return true;
  }

  const createTransaction = async () => {
    try {
      if(!validate()) return;
      if(hash != null) {
        const type = voteType == "SSS" ? VoteType.SSS : VoteType.QR;
        if(symbolService === undefined) throw new Error("symbolService is undefined");
        const result = await symbolService.voteTransaction(pollTitle, hash, selectedOption, type);
        if(type == VoteType.QR) {
          setQrCodeImage(result);
          setShowQrCode(true);
        }
      } else {
        throw new Error("hash is null");
      }
    } catch(e: any) {
      setWarningText(e.message);
      console.error(e.message);
    }
  }

  const handleSubmit = async () => {
    try {
      console.log(hash);
      const url = "http://localhost:1337/api/polls?filters[hash][$eq]=" + hash;
      const response = await (await fetch(url)).json();
      handleClick();
      if(response.data[0] == undefined) throw new Error("hash is invalid");
      const dateOfEnding = new Date(response.data[0].attributes.dateOfEnding).toUTCString();
      const currentUtc = new Date().toUTCString();
      if(dateOfEnding < currentUtc) throw new Error("poll is already closed");
      setDateOfEnding(dateOfEnding)
      setPollTitle(response.data[0].attributes.title)
      setPollDescription(response.data[0].attributes.description)
      const arr = (response.data[0].attributes.options as string).split(',');
      const pollOptions = [];
      for(let i = 0; i < arr.length; i++){
        pollOptions.push({name: arr[i]});
      }
      setPollOptions(pollOptions);
      setCanCreateTransaction(false);
    } catch(e: any) {
      setWarningText(e.message);
      setCanCreateTransaction(true);
      console.error(e.message);
    }
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
            <PageTitle>Join a Poll</PageTitle>
            <Grid container spacing={3}>
              <Grid item xs={10}>
              <TextField
                label="Hash"
                variant="outlined"
                fullWidth
                value={hash ?? ''}
                onChange={handleHashChange}
              />
              </Grid>
              <Grid item xs={2} style={{ marginTop: '10px' }}>
                <Button onClick={handleSubmit}>Submit</Button>
            </Grid>
            </Grid>
            <div id="pollData" style={{ display: showPollData ? "block" : "none" }}>
              <Grid container spacing={3} style={{ marginTop: '10px'}}>

                <Grid item xs={12}>
                  <TextField 
                    label='Title'
                    value={pollTitle}
                    disabled
                    fullWidth />
                </Grid>
                <Grid item xs={12}>
                  <TextField 
                    label='Description'
                    value={pollDescription}
                    disabled
                    fullWidth multiline rows={4}/>
                </Grid>
              </Grid>
              <Grid container spacing={2} style={{ marginTop: '10px', marginBottom: '10px' }} >
                <FormLabel style={{ paddingLeft: '16px' }}>options</FormLabel>
                {pollOptions.map((option, index) => (
                  <Grid item xs={12} md={12} key={index}>
                    <Grid container spacing={2} alignItems="flex-end">
                      <Grid item xs={3}>
                        <TextField
                          label={`Option ${index + 1} name`}
                          value={option.name}
                          fullWidth
                          disabled
                        />
                      </Grid>
                      <Grid item xs={2} style={{ marginTop: '10px' }}>
                        <Button onClick={() => selectOption(option.name)}>Select</Button>
                      </Grid>
                    </Grid>
                  </Grid>
                ))}
              </Grid>
              <Grid container spacing={3} style={{ marginTop: '20px', marginBottom: '10px' }} >
                <Grid item xs={12}>
                  <TextField
                    label="Date of ending"
                    value={dateOfEnding}
                    disabled
                    sx={{ width: "100%", maxWidth: "300px" }}
                  />
                </Grid>
              </Grid>
              <div style={{ marginTop: '40px', border: '1px solid', padding: '20px', marginBottom: '20px'}}>
                あなたの投票は<span style={{ fontSize: "30px"}}> {selectedOption} </span>です。署名タイプを選択しボタンをクリックして投票トランザクションを作成してください。<br></br>
              </div>
              <FormControl>
                <RadioGroup
                  row
                  value={voteType.toString()}
                  onChange={handleVoteTypeChange}
                >
                  <FormControlLabel value="SSS" control={<Radio />} label="SSS" />
                  <FormControlLabel value="QR" control={<Radio />} label="QR CODE" />
                </RadioGroup>
                <Button 
                  onClick={createTransaction} 
                  disabled={canCreateTransaction}
                >Create Transaction</Button>
              </FormControl>
              <div style={{ color: "#FF0000", padding: "20px", fontSize: "20px"}}>{warningText}</div>
              <div>
                <Image
                  style={{display: showQrCode ? "block" : "none", marginTop: "20px"}}
                  src={qrCodeImage}
                  width={300}
                  height= {300}
                  alt="qrcode">
                </Image>
              </div>
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
export default SymbolPoll;