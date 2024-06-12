import React, { ChangeEvent, useEffect, useRef, useState } from 'react';
import { Button } from 'primereact/button';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { InputText } from 'primereact/inputtext';
import 'primereact/resources/themes/saga-blue/theme.css';
import 'primereact/resources/primereact.min.css';
import 'primeicons/primeicons.css';
import 'primeflex/primeflex.css';
import { FileUpload } from 'primereact/fileupload';
import './App.css'
import { InputNumber } from 'primereact/inputnumber';
import { RadioButton } from 'primereact/radiobutton';
import ISomenteUmaPera from './interface/ISomenteUmaPera';
import IFrutaResposta from './interface/IFrutaResposta';
import axios from 'axios';
import { Toast } from 'primereact/toast';
import { Dialog } from 'primereact/dialog';
import Papa from 'papaparse';

const App = () => {

  let somenteUmaPeraVazia: ISomenteUmaPera
  somenteUmaPeraVazia = {
    id: '',
    tamanho: '',
    peso: '',
    docura: '',
    crocancia: '',
    suculencia: '',
    maturacao: '',
    acidez: '',
  }

  const [modeloSelecionado, setModeloSelecionado] = useState<string>('')
  const [arquivoCSV, setArquivoCSV] = useState<File | null>(null);
  const [caractersticas, setCaractersticas] = useState<ISomenteUmaPera>(somenteUmaPeraVazia);
  const caractersticasArray = [caractersticas];
  const [respostaFrutaDialog, setRespostaFrutaDialog] = useState<boolean>(false);
  const [mostrarFileUpload, setMostrarFileUpload] = useState<boolean>(false)
  const [alteracaoUmaPera, setAlteracaoUmaPera] = useState<boolean>()
  const [resultadoUnico, setResultadoUnico] = useState<any>()
  const [data, setData] = useState<IFrutaResposta[]>([]);
  const toast = useRef<any>(null);

  const REGRESSAO_LOGISTICA = "Regressão Logística"

  useEffect(() => {
    if (resultadoUnico !== undefined) {
      handleFileUploadUnico();
    }
    setAlteracaoUmaPera(false)
  }, [resultadoUnico]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>, field: keyof ISomenteUmaPera) => {
    setArquivoCSV(null)
    const { value } = e.target;
    setCaractersticas(prevcaractersticas => ({
      ...prevcaractersticas,
      [field]: value
    }));
    setAlteracaoUmaPera(prev => !prev);
  };

  const transformarEmString = (Pera: ISomenteUmaPera) => {
    let stringPera = '';

    Object.keys(Pera).forEach((key, index) => {
      stringPera += Pera[key as keyof ISomenteUmaPera];
      if (index !== Object.keys(Pera).length - 1) {
        stringPera += ',';
      }
    });

    return stringPera;
  }

  const handleChoose = (event: any) => {
    const file = event.files[0];
    if (file && file.type === 'text/csv') {
      setArquivoCSV(file.name);
      console.log(file.name)
    } else {
      toast.current.show({ severity: 'warn', summary: 'Aviso', detail: 'Por favor, selecione um arquivo CSV', life: 5000 });
    }
  };

  const todosPreenchidos = Object.keys(caractersticas).every(key => {
    return caractersticas[key as keyof typeof caractersticas] !== null && caractersticas[key as keyof typeof caractersticas] !== "";
  });

  const peloMenosUmPreenchido = Object.keys(caractersticas).some(key => {
    return caractersticas[key as keyof typeof caractersticas] !== "";
  });

  const todosVazios = Object.keys(caractersticas).every(key => {
    return caractersticas[key as keyof typeof caractersticas] === "";

  });

  const verificacoes = (): boolean => {
    if (modeloSelecionado == '') {
      toast.current.show({ severity: 'error', summary: 'Erro', detail: 'Escolha um Modelo', life: 5000 });
      return false
    }

    if (!arquivoCSV && todosPreenchidos) {
      return true
    }

    if (!arquivoCSV && peloMenosUmPreenchido) {
      toast.current.show({ severity: 'warn', summary: 'Aviso', detail: 'Preencha todos os Campos antes de Calcular Somente Uma Pera', life: 5000 });
      return false
    }

    if (arquivoCSV && peloMenosUmPreenchido || !arquivoCSV && todosVazios) {
      toast.current.show({ severity: 'warn', summary: 'Aviso', detail: 'Escolha Múltiplas Peras ou Somente uma Pera', life: 5000 });
      return false
    }

    return true
  }

  const handleFileSubmitt = async () => {
    if (verificacoes()) {
      if (modeloSelecionado == REGRESSAO_LOGISTICA) {
        enviarArquivoCSVRe()
      } else {
        enviarArquivoCSVArv()
      }
    }
    console.log(caractersticasArray)
  };

  const handleFileUnit = async () => {
    if (verificacoes()) {
      if (modeloSelecionado == REGRESSAO_LOGISTICA) {
        analiseModeloRegLog()
      } else {
        analiseModeloArvDec()
      }
      setRespostaFrutaDialog(true)
    }
  };

  const analiseModeloRegLog = async () => {
    const data = transformarEmString(caractersticas);
    const url = 'http://127.0.0.1:5000/unicoRegressao';
    axios.post(url, { data })
      .then(response => {
        const resultado = response.data.resultado;
        setResultadoUnico(resultado)
      })
      .catch(error => {
        console.error('Erro ao enviar dados:', error);
      });
  };


  const enviarArquivoCSVRe = async () => {
    if (arquivoCSV) {
      try {
        await axios.post('http://127.0.0.1:5000/multiploRegressao', {
          file_name: arquivoCSV
        });
        toast.current.show({ severity: 'success', summary: 'Sucesso', detail: 'Previsões feitas, por favor acesse novamente seu arquivo', life: 5000 });
        setMostrarFileUpload(true)
      } catch (error) {
        toast.current.show({ severity: 'error', summary: 'Erro', detail: 'Erro ao enviar arquivo', life: 5000 });
        console.error('Erro ao enviar arquivo:', error);
      }
    }
  };

  const analiseModeloArvDec = async () => {

    if (!arquivoCSV && todosPreenchidos) {
      const data = transformarEmString(caractersticas);
      const url = 'http://127.0.0.1:5000/unicoArvore';
      axios.post(url, { data })
        .then(response => {
          const resultado = response.data.resultado;
          setResultadoUnico(resultado)
        })
        .catch(error => {
          console.error('Erro ao enviar dados:', error);
        });
    } else {

    }
  };

  const enviarArquivoCSVArv = async () => {
    if (arquivoCSV) {
      try {
        await axios.post('http://127.0.0.1:5000/multiploArvore', {
          file_name: arquivoCSV
        });
        toast.current.show({ severity: 'success', summary: 'Sucesso', detail: 'Previsões feitas, por favor acesse novamente seu arquivo', life: 5000 });
        setMostrarFileUpload(true)
      } catch (error) {
        toast.current.show({ severity: 'error', summary: 'Erro', detail: 'Erro ao enviar arquivo', life: 5000 });
        console.error('Erro ao enviar arquivo:', error);
      }
    }
  }

  const hideResultadoFrutaDialog = () => {
    setRespostaFrutaDialog(false);
  };

  const titleHeaderDialog = () => {
    if (modeloSelecionado == REGRESSAO_LOGISTICA) {
      if (!arquivoCSV && todosPreenchidos) {
        return "Resultado: Regressão Logística - Somente uma Fruta"
      }
      if (arquivoCSV && todosVazios) {
        return "Resultado: Regressão Logística - Múltiplas Frutas"
      }
    } else {
      if (!arquivoCSV && todosPreenchidos) {
        return "Resultado: Arvore de Decisão - Somente uma Fruta"
      }
      if (arquivoCSV && todosVazios) {
        return "Resultado: Arvore de Decisão - Múltiplas Frutas"
      }
    }
  }

  const handleFileUploadCSV = (e: any) => {
    setRespostaFrutaDialog(false)

    const file = e.target.files[0]
    Papa.parse(file, {
      header: true,
      complete: (results: any) => {
        setData(results.data);
      }

    });

    setRespostaFrutaDialog(true)
    e.target.value = '';

  };


  const handleFileUploadUnico = () => {

    const newData = caractersticasArray.map((caracteristica) => ({
      id: caracteristica.id,
      tamanho: caracteristica.tamanho,
      peso: caracteristica.peso,
      docura: caracteristica.docura,
      crocancia: caracteristica.crocancia,
      suculencia: caracteristica.suculencia,
      maturacao: caracteristica.maturacao,
      acidez: caracteristica.acidez,
      resultado: resultadoUnico
    }));
    setData(newData);

    setRespostaFrutaDialog(true)
  };

  const handleRespostaChange = (e: React.ChangeEvent<HTMLInputElement>, field: keyof typeof data[0]) => {
    const updatedData = data.map((rowData: any) => ({
      ...rowData,
      [field]: e.target.value
    }));
    console.log("Testeee: " + updatedData)
    setData(updatedData);
  };

  const anularArquivo = () => {
    setArquivoCSV(null)
  }

  const limparDataTable = () => {
    setCaractersticas(somenteUmaPeraVazia)
  }

  return (
    <div className='m-0' style={{ backgroundColor: '##FFFACD' }}>
      <Toast ref={toast} />
      <h1 className="text-center text-6xl font-bold text-white p-3" style={{ backgroundColor: '#69b169', fontFamily: 'Inika' }}>MyFruit</h1>
      <div className="col-12">
        <div className="flex flex-column align-content-between">
          <div className='flex'>
            <p className='ml-3 font-bold text-4xl w-2 block' style={{ fontFamily: 'Inika' }}>Escolha o modelo:</p>
            <div className='w-6 align-content-center pt-2'>
              <div className="flex text-2xl">
                <RadioButton inputId="regLog" name="regLog" value="Regressão Logística" onChange={(e) => setModeloSelecionado(e.value)} checked={modeloSelecionado === 'Regressão Logística'} />
                <label htmlFor="regLog" className="ml-2">Regressão Logística</label>
              </div>
              <div className="flex text-2xl">
                <RadioButton inputId="arvDec" name="arvDec" value="Árvore de Decisão" onChange={(e) => setModeloSelecionado(e.value)} checked={modeloSelecionado === 'Árvore de Decisão'} />
                <label htmlFor="arvDec" className="ml-2">Árvore de Decisão</label>
              </div>
            </div>
          </div>
        </div>
        <div className='flex'>
          <div className='pt-4'>
            <p className='ml-3 font-bold text-4xl mr-3' style={{ fontFamily: 'Inika' }}>Calcular Múltiplas Peras:</p>
          </div>
          <FileUpload className='border-blue-900 border-solid border-round-md' accept=".csv" maxFileSize={1000000} onClear={anularArquivo} onRemove={anularArquivo} onSelect={handleChoose} emptyTemplate={<p className="m-0">Arraste e Solte o Arquivo CSV Aqui</p>} />
        </div>
      </div>
      <div className='ml-3 mr-3 h-16rem'>
        <div className="flex items-center justify-content-between">
          <p className='font-bold text-4xl' style={{ fontFamily: 'Inika' }}>Calcular Somente uma Pera:</p>
          <Button onClick={limparDataTable} className='text-2xl button-rounded border-round-lg mr-3 h-4rem align-self-center' label='Limpar' />
        </div>

        <DataTable className='border-blue-900 border-solid border-round-md' value={caractersticasArray}  >
          <Column header="id" bodyStyle={{ backgroundColor: '#cfcfc1' }} headerStyle={{ backgroundColor: '#b0e056', fontSize: '22px', fontFamily: 'Inika' }} body={(rowData) => (<InputText size={25} value={rowData.id} required onChange={(e) => handleInputChange(e, 'id')} />)} />
          <Column header="tamanho" bodyStyle={{ backgroundColor: '#cfcfc1' }} headerStyle={{ backgroundColor: '#b0e056', fontSize: '22px', fontFamily: 'Inika' }} body={(rowData) => (<InputText size={25} value={rowData.tamanho} required onChange={(e) => handleInputChange(e, 'tamanho')} />)} />
          <Column header="peso" bodyStyle={{ backgroundColor: '#cfcfc1' }} headerStyle={{ backgroundColor: '#b0e056', fontSize: '22px', fontFamily: 'Inika' }} body={(rowData) => (<InputText size={25} value={rowData.peso} required onChange={(e) => handleInputChange(e, 'peso')} />)} />
          <Column header="docura" bodyStyle={{ backgroundColor: '#cfcfc1' }} headerStyle={{ backgroundColor: '#b0e056', fontSize: '22px', fontFamily: 'Inika' }} body={(rowData) => (<InputText size={25} value={rowData.docura} required onChange={(e) => handleInputChange(e, 'docura')} />)} />
          <Column header="crocancia" bodyStyle={{ backgroundColor: '#cfcfc1' }} headerStyle={{ backgroundColor: '#b0e056', fontSize: '22px', fontFamily: 'Inika' }} body={(rowData) => (<InputText size={25} value={rowData.crocancia} onChange={(e) => handleInputChange(e, 'crocancia')} />)} />
          <Column header="suculencia" bodyStyle={{ backgroundColor: '#cfcfc1' }} headerStyle={{ backgroundColor: '#b0e056', fontSize: '22px', fontFamily: 'Inika' }} body={(rowData) => (<InputText size={25} value={rowData.suculencia} onChange={(e) => handleInputChange(e, 'suculencia')} />)} />
          <Column header="maturacao" bodyStyle={{ backgroundColor: '#cfcfc1' }} headerStyle={{ backgroundColor: '#b0e056', fontSize: '22px', fontFamily: 'Inika' }} body={(rowData) => (<InputText size={25} value={rowData.maturacao} onChange={(e) => handleInputChange(e, 'maturacao')} />)} />
          <Column header="acidez" bodyStyle={{ backgroundColor: '#cfcfc1' }} headerStyle={{ backgroundColor: '#b0e056', fontSize: '22px', fontFamily: 'Inika' }} body={(rowData) => (<InputText size={25} value={rowData.acidez} onChange={(e) => handleInputChange(e, 'acidez')} />)} />
        </DataTable>
      </div>
      <Dialog visible={respostaFrutaDialog} style={{ width: '80%' }} header={titleHeaderDialog} modal className="p-fluid" onHide={hideResultadoFrutaDialog} >
        <div>
          <DataTable className='border-blue-900 border-solid border-round-md' value={data}  >
            <Column header="id" bodyStyle={{ backgroundColor: '#cfcfc1', width: '180px', minWidth: '180px' }} headerStyle={{ backgroundColor: '#b0e056', fontSize: '22px', fontFamily: 'Inika' }} body={(rowData) => (<InputText size={25} value={rowData.id} data-id={rowData.ID} readOnly onChange={(e) => handleRespostaChange(e, 'id')} />)} />
            <Column header="tamanho" bodyStyle={{ backgroundColor: '#cfcfc1', width: '180px', minWidth: '180px' }} headerStyle={{ backgroundColor: '#b0e056', fontSize: '22px', fontFamily: 'Inika' }} body={(rowData) => (<InputText size={25} value={rowData.tamanho} data-id={rowData.ID} readOnly onChange={(e) => handleRespostaChange(e, 'tamanho')} />)} />
            <Column header="peso" bodyStyle={{ backgroundColor: '#cfcfc1', width: '180px', minWidth: '180px' }} headerStyle={{ backgroundColor: '#b0e056', fontSize: '22px', fontFamily: 'Inika' }} body={(rowData) => (<InputText size={25} value={rowData.peso} data-id={rowData.ID} readOnly onChange={(e) => handleRespostaChange(e, 'peso')} />)} />
            <Column header="docura" bodyStyle={{ backgroundColor: '#cfcfc1', width: '180px', minWidth: '180px' }} headerStyle={{ backgroundColor: '#b0e056', fontSize: '22px', fontFamily: 'Inika' }} body={(rowData) => (<InputText size={25} value={rowData.docura} data-id={rowData.ID} readOnly required onChange={(e) => handleRespostaChange(e, 'docura')} />)} />
            <Column header="crocancia" bodyStyle={{ backgroundColor: '#cfcfc1', width: '180px', minWidth: '180px' }} headerStyle={{ backgroundColor: '#b0e056', fontSize: '22px', fontFamily: 'Inika' }} body={(rowData) => (<InputText size={25} value={rowData.crocancia} data-id={rowData.ID} readOnly onChange={(e) => handleRespostaChange(e, 'crocancia')} />)} />
            <Column header="suculencia" bodyStyle={{ backgroundColor: '#cfcfc1', width: '180px', minWidth: '180px' }} headerStyle={{ backgroundColor: '#b0e056', fontSize: '22px', fontFamily: 'Inika' }} body={(rowData) => (<InputText size={25} value={rowData.suculencia} data-id={rowData.ID} readOnly onChange={(e) => handleRespostaChange(e, 'suculencia')} />)} />
            <Column header="maturacao" bodyStyle={{ backgroundColor: '#cfcfc1', width: '180px', minWidth: '180px' }} headerStyle={{ backgroundColor: '#b0e056', fontSize: '22px', fontFamily: 'Inika' }} body={(rowData) => (<InputText size={25} value={rowData.maturacao} data-id={rowData.ID} readOnly onChange={(e) => handleRespostaChange(e, 'maturacao')} />)} />
            <Column header="acidez" bodyStyle={{ backgroundColor: '#cfcfc1', width: '180px', minWidth: '180px' }} headerStyle={{ backgroundColor: '#b0e056', fontSize: '22px', fontFamily: 'Inika' }} body={(rowData) => (<InputText size={25} value={rowData.acidez} data-id={rowData.ID} readOnly onChange={(e) => handleRespostaChange(e, 'acidez')} />)} />
            <Column header="resultado" bodyStyle={{ backgroundColor: '#cfcfc1', width: '180px', minWidth: '180px' }} headerStyle={{ backgroundColor: '#b0e056', fontSize: '22px', fontFamily: 'Inika' }} body={(rowData) => (<InputText size={25} value={rowData.resultado} data-id={rowData.ID} readOnly onChange={(e) => handleRespostaChange(e, 'resultado')} />)} />
          </DataTable>
        </div>
      </Dialog>

      <div className='flex justify-content-end mr-3 mt-3'>
        {(mostrarFileUpload && arquivoCSV) && (
          <div style={{ position: 'relative', display: 'inline-block', marginTop: '10px' }}>
            <input
              type="file"
              accept=".csv"
              onChange={handleFileUploadCSV}
              style={{
                position: 'absolute',
                left: 0,
                top: 0,
                opacity: 0,
                width: '100%',
                height: '100%',
                cursor: 'pointer'
              }}
            />
            <button
              style={{
                display: 'inline-block',
                padding: '20px 20px',
                fontSize: '20px',
                cursor: 'pointer',
                backgroundColor: '#0d89ec',
                color: 'white',
                border: 'none',
                borderRadius: '5px'
              }}
            >
              Visualizar CSV
            </button>
          </div>
        )}
        <Button label="Calcular Arquivo" onClick={handleFileSubmitt} style={{ fontFamily: 'inika' }} className="button-rounded border-round-lg mt-2 w-2 h-4rem text-2xl text-white bg-orange-900 border-orange-900 m-2" />
        <Button label="Calcular Uma Pera" onClick={handleFileUnit} style={{ fontFamily: 'inika' }} className="button-rounded border-round-lg mt-2 w-2 h-4rem text-2xl text-white bg-orange-900 border-orange-900" />
      </div>
    </div>
  );
};

export default App;
