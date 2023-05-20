import DEFAULT_QR_CODE_IMAGE from '@/assets/logo/symbol-default-cover-logo.svg';
import MainBackground from '@/components/atom/MainBackground';
import { PageTitle } from '@/components/atom/Titles';
import Footer from '@/components/moleculs/Footer';
import Header from '@/components/moleculs/Header';
import { ResultTable } from '@/components/moleculs/result';
import { SymbolService, VoteType } from '@/services/symbolService';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import FormControl from '@mui/material/FormControl';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormLabel from '@mui/material/FormLabel';
import Grid from '@mui/material/Grid';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import TextField from '@mui/material/TextField';
import Toolbar from '@mui/material/Toolbar';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { GetStaticProps, NextPage } from 'next/types';
import { useEffect, useState } from 'react';

interface PollResponse {
  data: {
    id: number;
    attributes: {
      title: string;
      description: string;
      options: string;
      publicKey: string;
      result: PollResult[] | null;
      hash: string;
      startHeight: number;
      createdAt: string;
      updatedAt: string;
      publishedAt: string;
      specificMosaicId: string | null;
      dateOfEnding: string;
    };
  }[];
  meta: {
    pagination: {
      page: number;
      pageSize: number;
      pageCount: number;
      total: number;
    };
  };
}

export interface PollResult {
  option: string;
  totalImpotance: {
    lower: number;
    higher: number;
  };
  count: number;
}

interface Props {}

const SymbolPoll: NextPage<Props> = ({}) => {
  const router = useRouter();

  const [hash, setHash] = useState<string | null>(null);
  const handleHashChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setHash(event.target.value);
  };

  const [showPollData, setShowPollData] = useState(false);
  const handleClick = () => {
    setShowPollData(true);
  };

  const [pollTitle, setPollTitle] = useState<string>('');
  const [voteType, setVoteType] = useState<string>('SSS');
  const [uri, setURI] = useState<string>('');
  const [showURI, setShowURI] = useState<boolean>(false);
  const [qrCodeImage, setQrCodeImage] = useState<string>(DEFAULT_QR_CODE_IMAGE);
  const [showQrCode, setShowQrCode] = useState<boolean>(false);
  const handleVoteTypeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setVoteType((event.target as HTMLInputElement).value);
  };

  const [pollDescription, setPollDescription] = useState<string>('');
  const [pollOptions, setPollOptions] = useState([{ name: '' }]);
  const [dateOfEnding, setDateOfEnding] = useState<string>('');
  const [specificMosaicId, setSpecificMosaicId] = useState<string>('');
  const [specificMosaicAmount, setSpecificMosaicAmount] = useState<number>(0);
  const [selectedOption, setSelectedOption] = useState<string>('未選択');
  const [warningText, setWarningText] = useState<string>('');
  const [announcedHash, setAnnouncedHash] = useState<string>('');
  const [isAnnounced, setIsAnnounced] = useState<boolean>(false);
  const [symbolService, setSymbolService] = useState<SymbolService>();
  const [isPollFinished, setIsPollFinished] = useState<boolean>(false);
  const [canCreateTransaction, setCanCreateTransaction] = useState(false);
  const [voteResults, setVoteResults] = useState<PollResult[] | null>(null);

  useEffect(() => {
    const { hash } = router.query;
    if (typeof hash === 'string') if (hash.length == 64) setHash(hash);
    const { option } = router.query;
    if (typeof option === 'string') selectOption(option);
    const { signed_payload } = router.query;
    if (typeof signed_payload === 'string')
      if (symbolService == undefined) {
        const service = new SymbolService();
        service.init().then(() => {
          setSymbolService(service);
          service.announceTransactionFromAlice(signed_payload).then((hash) => {
            setAnnouncedHash(hash);
            setIsAnnounced(true);
          });
        });
      } else {
        symbolService.announceTransactionFromAlice(signed_payload).then((hash) => {
          setAnnouncedHash(hash);
          setIsAnnounced(true);
        });
      }
  }, [router.query]);

  useEffect(() => {
    if (hash) {
      handleSubmit();
    }
  }, [hash]);

  useEffect(() => {
    if (symbolService != undefined) return;
    const initSymbolService = async () => {
      const service = new SymbolService();
      await service.init();
      setSymbolService(service);
    };
    initSymbolService();
  }, []);

  const selectOption = (option: string) => {
    setSelectedOption(option);
  };

  function validate() {
    if (selectedOption == '未選択') {
      setWarningText('選択されていません');
      return false;
    }
    return true;
  }

  const createTransaction = async () => {
    setWarningText('');
    setShowQrCode(false);
    setShowURI(false);
    try {
      if (!validate()) return;
      if (hash != null) {
        let type: VoteType = VoteType.SSS;
        switch (voteType) {
          case 'SSS':
            type = VoteType.SSS;
            break;
          case 'QR':
            type = VoteType.QR;
            break;
          case 'URI':
            type = VoteType.URI;
            break;
          case 'ALICE':
            type = VoteType.ALICE;
            break;
        }
        if (symbolService === undefined) throw new Error('symbolService is undefined');
        const result = await symbolService.voteTransaction(
          pollTitle,
          hash,
          selectedOption,
          type,
          specificMosaicId,
          specificMosaicAmount
        );
        if (type == VoteType.QR) {
          setQrCodeImage(result);
          setShowQrCode(true);
        } else if (type == VoteType.URI) {
          setURI(result);
          setShowURI(true);
        }
      } else {
        throw new Error('hash is null');
      }
    } catch (e: any) {
      setWarningText(e.message);
      console.error(e.message);
    }
  };

  const handleSubmit = async () => {
    try {
      const url = process.env.NEXT_PUBLIC_API_URL + '/api/polls?filters[hash][$eq]=' + hash;
      const response: PollResponse = await (await fetch(url)).json();
      handleClick();
      if (response.data[0] == undefined) throw new Error('hash is invalid');
      const dateOfEnding = new Date(response.data[0].attributes.dateOfEnding);
      const currentUtc = new Date();
      if (dateOfEnding < currentUtc) setIsPollFinished(true);

      setVoteResults(response.data[0].attributes.result);

      setDateOfEnding(dateOfEnding.toUTCString());
      setPollTitle(response.data[0].attributes.title);
      setPollDescription(response.data[0].attributes.description);
      if (response.data[0].attributes.specificMosaicId != null) {
        const sm = response.data[0].attributes.specificMosaicId;
        setSpecificMosaicId(sm);
      }
      const arr = (response.data[0].attributes.options as string).split(',');
      const pollOptions = [];
      for (let i = 0; i < arr.length; i++) {
        pollOptions.push({ name: arr[i] });
      }
      setPollOptions(pollOptions);
      setCanCreateTransaction(false);
    } catch (e: any) {
      setWarningText(e.message);
      setCanCreateTransaction(true);
      console.error(e.message);
    }
  };

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
                <TextField label='Hash' variant='outlined' fullWidth value={hash ?? ''} onChange={handleHashChange} />
              </Grid>
              <Grid item xs={2} style={{ marginTop: '10px' }}>
                <Button onClick={handleSubmit}>Submit</Button>
              </Grid>
            </Grid>
            <div id='pollData' style={{ display: showPollData ? 'block' : 'none' }}>
              <Grid container spacing={3} style={{ marginTop: '10px' }}>
                <Grid item xs={12}>
                  <TextField label='Title' value={pollTitle} disabled fullWidth />
                </Grid>
                <Grid item xs={12}>
                  <TextField label='Description' value={pollDescription} disabled fullWidth multiline rows={4} />
                </Grid>
              </Grid>
              <Grid container spacing={2} style={{ marginTop: '10px', marginBottom: '10px' }}>
                <FormLabel style={{ paddingLeft: '16px' }}>options</FormLabel>
                {pollOptions.map((option, index) => (
                  <Grid item xs={12} md={12} key={index}>
                    <Grid container spacing={2} alignItems='flex-end'>
                      <Grid item xs={3}>
                        <TextField label={`Option ${index + 1} name`} value={option.name} fullWidth disabled />
                      </Grid>
                      <Grid item xs={2} style={{ marginTop: '10px' }}>
                        <Button
                          onClick={() => selectOption(option.name)}
                          style={{ display: !isPollFinished ? 'block' : 'none' }}
                        >
                          Select
                        </Button>
                      </Grid>
                    </Grid>
                  </Grid>
                ))}
              </Grid>
              {/* モザイク投票の場合 */}
              <Grid container spacing={3} style={{ marginTop: '20px', marginBottom: '10px' }}>
                <Grid item xs={12} style={{ display: specificMosaicId != '' ? 'block' : 'none' }}>
                  <TextField
                    label='Specific MosaicId'
                    value={specificMosaicId}
                    disabled
                    sx={{ width: '100%', maxWidth: '300px' }}
                  />
                  <div style={{ marginTop: '1rem', display: !isPollFinished ? 'block' : 'none' }}>
                    ※この投票では指定モザイクでの総数がカウントされインポータンスは考慮されません。以下から投票数を入力してください。入力値よりも少ない所持数の場合はトランザクションがアナウンスできません。
                  </div>
                </Grid>
                <Grid item xs={12} style={{ display: specificMosaicId != '' && !isPollFinished ? 'block' : 'none' }}>
                  <TextField
                    label='Specific Mosaic Amount'
                    value={specificMosaicAmount}
                    onChange={(e) => setSpecificMosaicAmount(Number(e.target.value))}
                    type='number'
                    sx={{ width: '100%', maxWidth: '300px' }}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    label='Date of ending'
                    value={dateOfEnding}
                    disabled
                    sx={{ width: '100%', maxWidth: '300px' }}
                  />
                </Grid>
              </Grid>
              <Grid item xs={12} style={{ display: isPollFinished ? 'block' : 'none', marginTop: '20px' }}>
                <div style={{ marginBottom: '10px', marginTop: '0px', paddingLeft: '5px', fontWeight: 'bold' }}>
                  Result
                </div>
                <ResultTable data={voteResults} />
              </Grid>
              <div style={{ display: !isPollFinished ? 'block' : 'none' }}>
                <div style={{ marginTop: '40px', border: '1px solid', padding: '20px', marginBottom: '20px' }}>
                  あなたの投票は<span style={{ fontSize: '30px' }}> {selectedOption} </span>
                  です。署名タイプを選択しボタンをクリックして投票トランザクションを作成してください。<br></br>
                </div>
                <div
                  style={{
                    marginTop: '10px',
                    padding: '20px',
                    marginBottom: '20px',
                    display: isAnnounced ? 'block' : 'none',
                  }}
                >
                  アナウンスが完了しました。 TranasctionHash: {announcedHash}
                  <br></br>
                </div>
                <FormControl>
                  <RadioGroup row value={voteType.toString()} onChange={handleVoteTypeChange}>
                    <FormControlLabel value='SSS' control={<Radio />} label='SSS' />
                    <FormControlLabel value='QR' control={<Radio />} label='QR CODE' />
                    <FormControlLabel value='URI' control={<Radio />} label='Transaction URI' />
                    <FormControlLabel value='ALICE' control={<Radio />} label='Sign with aLice' />
                  </RadioGroup>
                  <Button onClick={createTransaction} disabled={canCreateTransaction}>
                    Create Transaction
                  </Button>
                </FormControl>
                <div style={{ color: '#FF0000', padding: '20px', fontSize: '20px' }}>{warningText}</div>
                <div>
                  <Image
                    style={{ display: showQrCode ? 'block' : 'none', marginTop: '20px' }}
                    src={qrCodeImage}
                    width={300}
                    height={300}
                    alt='qrcode'
                  ></Image>
                </div>
                <div id='uri' style={{ display: showURI ? 'block' : 'none', marginBottom: '10px' }}>
                  <Grid item xs={12}>
                    <TextField label='Transaction URI' variant='outlined' fullWidth value={uri} disabled />
                  </Grid>
                </div>
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
