import MainBackground from '@/components/atom/MainBackground';
import { PageTitle, SectionTitle, SubTitle } from '@/components/atom/Titles';
import Header from '@/components/moleculs/Header';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import { useTheme } from '@mui/material/styles';
import Toolbar from '@mui/material/Toolbar';
import useMediaQuery from '@mui/material/useMediaQuery';
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
const DEFAULT_CAVER_IMAGE = '/assets/img/symbol-logo-default-cover.webp';
interface Props {}

const SymbolPoll: NextPage<Props> = ({}) => {
  const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.between('xs', 'md'));
  const xssMatches = useMediaQuery('@media screen and (min-width:400px)')
  const router = useRouter();
  
  const [hash, setHash] = useState<string | null>(null);
  const handleHashChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setHash(event.target.value);
  };

  const [showPollData, setShowPollData] = useState(false);
  const handleClick = () => {
    setShowPollData(true);
  }

  const [title, setTitle] = useState<string>("");
  const [voteType, setVoteType] = useState<string>("SSS");
  const [qrcode, setQrcode] = useState<string>(DEFAULT_CAVER_IMAGE);
  const [showQr, setShowQr] = useState<boolean>(false);
  const handleChangeOutType = (event: React.ChangeEvent<HTMLInputElement>) => {
    setVoteType((event.target as HTMLInputElement).value)
  };

  const [description, setDescription] = useState<string>("");
  const [options, setOptions] = useState([{ name: '' }]);
  const [openDate, setOpenDate] = useState<string>("");
  const [option, setOption] = useState<string>("未選択");

  const symbolService = new SymbolService();
  symbolService.init()
  
  useEffect(() => {
    const { hash } = router.query;
    if (typeof hash === 'string') {
      if(hash.length == 64) {
        setHash(hash);
      }
    }
  }, [router.query]);

  
  const selectOption = (_option: string) => {
    setOption(_option);
  }

  function validate() {
    if(option == "未選択") return false;
    return true;
  }

  const createTransaction = async () => {
    if(!validate()) return;
    if(hash != null) {
      const type = voteType == "SSS" ? VoteType.SSS : VoteType.QR;
      const result = await symbolService.voteTransaction(title, hash, option, type);
      if(type == VoteType.QR) {
        setQrcode(result);
        setShowQr(true);
      }
    } else{
      throw new Error("hash is null");
    }
  }

  const handleSubmit = () =>{
    const url = process.env.NEXT_PUBLIC_API_URL + "/api/polls?filters[hash][$eq]=" + hash;
    fetch(url)
    .then((response)=> response.json()
      ).then((responseJson) =>{
        handleClick();
        console.log(responseJson.data[0].attributes.openPollDate)
        setOpenDate(responseJson.data[0].attributes.openPollDate)
        setTitle(responseJson.data[0].attributes.title)
        setDescription(responseJson.data[0].attributes.description)
        const arr = (responseJson.data[0].attributes.options as string).split(',');
        const d = [];
        for(let i = 0; i < arr.length; i++){
          d.push({name: arr[i]});
        }
        setOptions(d);
      })
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
            <div id = "pollData" style={{ display: showPollData ? "block" : "none" }}>
              <Grid container spacing={3} style={{ marginTop: '10px'}}>

                <Grid item xs={12}>
                  <TextField 
                    label='Title'
                    value={title}
                    disabled
                    fullWidth />
                </Grid>
                <Grid item xs={12}>
                  <TextField 
                    label='Description'
                    value={description}
                    disabled
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
                  label="Open poll date"
                  value={openDate}
                  disabled
                  sx={{ width: "100%", maxWidth: "300px" }}
                />
                </Grid>
              </Grid>
              <div style={{ marginTop: '40px', border: '1px solid', padding: '20px', marginBottom: '20px'}}>
                あなたの投票は<span style={{ fontSize: "30px"}}> {option} </span>です。署名タイプを選択しボタンをクリックして投票トランザクションを作成してください。<br></br>
              </div>
              <FormControl>
              <RadioGroup
                row
                value={voteType.toString()}
                onChange={handleChangeOutType}
              >
                  <FormControlLabel value="SSS" control={<Radio />} label="SSS" />
                  <FormControlLabel value="QR" control={<Radio />} label="QR CODE" />
                </RadioGroup>
                <Button onClick={createTransaction}>Create Transaction</Button>
              </FormControl>
              <div>
              <Image
                style={{display: showQr ? "block" : "none", marginTop: "20px"}}
                src={qrcode}
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
