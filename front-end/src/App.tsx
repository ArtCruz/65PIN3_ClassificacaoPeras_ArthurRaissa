import React, { ChangeEvent, useRef, useState } from 'react';
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
import axios from 'axios';
import { Toast } from 'primereact/toast';
import { Dropdown } from 'primereact/dropdown';

const App = () => {

  let somenteUmaPeraVazia: ISomenteUmaPera
  somenteUmaPeraVazia = {
    ID: '',
    tamanho: '',
    peso: '',
    docura: '',
    crocancia: '',
    suculencia: '',
    maturacao: '',
    acidez: '',
  }

  const [modeloSelecionado, setModeloSelecionado] = useState<string>('')
  const [file, setFile] = useState<File | null>(null);
  const [arquivoCSV, setArquivoCSV] = useState<File | null>(null);
  const [caractersticas, setCaractersticas] = useState<ISomenteUmaPera>(somenteUmaPeraVazia);
  const caractersticasArray = [caractersticas];
  const toast = useRef<any>(null);


  const REGRESSAO_LOGISTICA = "Regressão Logística"

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>, field: keyof ISomenteUmaPera) => {
    const { value } = e.target;
    setCaractersticas(prevcaractersticas => ({
      ...prevcaractersticas,
      [field]: value
    }));
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
    console.log("pegou nome")
      setArquivoCSV(file.name);
    console.log( file.name)
    } else {
      toast.current.show({ severity: 'warn', summary: 'Aviso', detail: 'Por favor, selecione um arquivo CSV', life: 5000 });
    }
  };

  // const enviarArquivoCSV = async () => {
  //   if (arquivoCSV) {
  //     try {
  //         const response = await axios.post('http://127.0.0.1:5000/multiploRegressao', {
  //             file_name: arquivoCSV
  //         });
  //         console.log(arquivoCSV)
  //     } catch (error) {
  //         toast.current.show({ severity: 'error', summary: 'Erro', detail: 'Erro ao enviar arquivo', life: 5000 });
  //         console.error('Erro ao enviar arquivo:', error);
  //     }
  //   }
  // };






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
        // analiseModeloRegLog()
        enviarArquivoCSVRe()
      } else {
        // analiseModeloArvDec()
        enviarArquivoCSVArv()
      }
      console.log(modeloSelecionado)
      console.log(caractersticas)
      console.log(transformarEmString(caractersticas))
      console.log(arquivoCSV)
    }
  };

  // const handleFileSubmit = async () => {
  //   if (verificacoes()) {
  //     if (arquivoCSV && todosVazios) {
  //       await enviarArquivoCSV();
  //     } else if (!arquivoCSV && todosPreenchidos) {
  //       // await enviarDadosUnicos();
  //     }
  //   }
  // };
  
  const analiseModeloRegLog = async () => {
    // const data = Object.values(caractersticas).join(',');
    // const data = [225, -2.002139587, -2.625820278, -0.908798685, -1.780175222, 1.197048603, 3.678592367, -4.434327674];
    if (!arquivoCSV && todosPreenchidos) {  
      const data = Object.values(caractersticas).join(',');
      const url = 'http://127.0.0.1:5000/unicoRegressao';
      axios.post(url, { data } )
        .then(response => {
          const resultado = response.data.resultado;
          console.log(resultado)
        })
        .catch(error => {
          console.error('Erro ao enviar dados:', error);
        });

    } else if (arquivoCSV && todosVazios) {
        
    }
  };
  
  
  const enviarArquivoCSVRe = async () => {
    if (arquivoCSV) {
      try {
        await axios.post('http://127.0.0.1:5000/multiploRegressao', {
          file_name: arquivoCSV
        });
        console.log("Previsões feitas, por favor acesse novamente seu arquivo")
//-------------ARTHUR FAZER ESSA MENSAGEM EXIBIR NA TELA ------------------------------------------------------------------------
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
          // Faça o que quiser com o resultado
          console.log(resultado)
        })
        .catch(error => {
          console.error('Erro ao enviar dados:', error);
        });
    } else  {
    
    }
  };

  const enviarArquivoCSVArv = async () => {
    if (arquivoCSV) {
      try {
          await axios.post('http://127.0.0.1:5000/multiploArvore', {
              file_name: arquivoCSV
          });
          console.log("Previsões feitas, por favor acesse novamente seu arquivo")
          //-------------ARTHUR FAZER ESSA MENSAGEM EXIBIR NA TELA ------------------------------------------------------------------------
      } catch (error) {
          toast.current.show({ severity: 'error', summary: 'Erro', detail: 'Erro ao enviar arquivo', life: 5000 });
          console.error('Erro ao enviar arquivo:', error);
      }
    }
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
          <FileUpload className='border-blue-900 border-solid border-round-md' accept=".csv" maxFileSize={1000000} onSelect={handleChoose} emptyTemplate={<p className="m-0">Arraste e Solte o Arquivo CSV Aqui</p>} />
        </div>
      </div>
      <div className='ml-3 mr-3 h-16rem'>
        <p className='font-bold text-4xl' style={{ fontFamily: 'Inika' }} >Calcular Somente uma Pera:</p>

        <DataTable className='border-blue-900 border-solid border-round-md' value={caractersticasArray}  >
          {/* <Column header="ID" bodyStyle={{ backgroundColor: '#cfcfc1' }} headerStyle={{ backgroundColor: '#b0e056', fontSize: '22px', fontFamily: 'Inika' }} body={(rowData) => (<InputNumber value={rowData.ID} required onValueChange={(e: any) => handleInputChange(e, 'ID')} mode="decimal" />)} />
          <Column header="tamanho" bodyStyle={{ backgroundColor: '#cfcfc1' }} headerStyle={{ backgroundColor: '#b0e056', fontSize: '22px', fontFamily: 'Inika' }} body={(rowData) => (<InputNumber value={rowData.tamanho} required onValueChange={(e: any) => handleInputChange(e, 'tamanho')} mode="decimal" />)} />
          <Column header="peso" bodyStyle={{ backgroundColor: '#cfcfc1' }} headerStyle={{ backgroundColor: '#b0e056', fontSize: '22px', fontFamily: 'Inika' }} body={(rowData) => (<InputNumber value={rowData.peso} required onValueChange={(e: any) => handleInputChange(e, 'peso')} mode="decimal" max={10000000000} minFractionDigits={0} maxFractionDigits={5} step={0.00001} />)} />
          <Column header="docura" bodyStyle={{ backgroundColor: '#cfcfc1' }} headerStyle={{ backgroundColor: '#b0e056', fontSize: '22px', fontFamily: 'Inika' }} body={(rowData) => (<InputNumber value={rowData.docura} required onValueChange={(e: any) => handleInputChange(e, 'docura')} mode="decimal" max={10000000000} minFractionDigits={0} maxFractionDigits={5} step={0.00001} />)} />
          <Column header="crocancia" bodyStyle={{ backgroundColor: '#cfcfc1' }} headerStyle={{ backgroundColor: '#b0e056', fontSize: '22px', fontFamily: 'Inika' }} body={(rowData) => (<InputNumber value={rowData.crocancia} onValueChange={(e: any) => handleInputChange(e, 'crocancia')} mode="decimal" max={10000000000} minFractionDigits={0} maxFractionDigits={5} step={0.00001} />)} />
          <Column header="suculencia" bodyStyle={{ backgroundColor: '#cfcfc1' }} headerStyle={{ backgroundColor: '#b0e056', fontSize: '22px', fontFamily: 'Inika' }} body={(rowData) => (<InputNumber value={rowData.suculencia} onValueChange={(e: any) => handleInputChange(e, 'suculencia')} mode="decimal" max={10000000000} minFractionDigits={0} maxFractionDigits={5} step={0.00001} />)} />
          <Column header="maturacao" bodyStyle={{ backgroundColor: '#cfcfc1' }} headerStyle={{ backgroundColor: '#b0e056', fontSize: '22px', fontFamily: 'Inika' }} body={(rowData) => (<InputNumber value={rowData.maturacao} onValueChange={(e: any) => handleInputChange(e, 'maturacao')} mode="decimal" max={10000000000} minFractionDigits={0} maxFractionDigits={5} step={0.00001} />)} />
          <Column header="acidez" bodyStyle={{ backgroundColor: '#cfcfc1' }} headerStyle={{ backgroundColor: '#b0e056', fontSize: '22px', fontFamily: 'Inika' }} body={(rowData) => (<InputNumber value={rowData.acidez} onValueChange={(e: any) => handleInputChange(e, 'acidez')} mode="decimal" max={10000000000} minFractionDigits={0} maxFractionDigits={5} step={0.00001} />)} />
         */}
          <Column header="ID" bodyStyle={{ backgroundColor: '#cfcfc1' }} headerStyle={{ backgroundColor: '#b0e056', fontSize: '22px', fontFamily: 'Inika' }} body={(rowData) => (<InputText value={rowData.ID} required onChange={(e) => handleInputChange(e, 'ID')} />)} />
          <Column header="tamanho" bodyStyle={{ backgroundColor: '#cfcfc1' }} headerStyle={{ backgroundColor: '#b0e056', fontSize: '22px', fontFamily: 'Inika' }} body={(rowData) => (<InputText value={rowData.tamanho} required onChange={(e) => handleInputChange(e, 'tamanho')} />)} />
          <Column header="peso" bodyStyle={{ backgroundColor: '#cfcfc1' }} headerStyle={{ backgroundColor: '#b0e056', fontSize: '22px', fontFamily: 'Inika' }} body={(rowData) => (<InputText value={rowData.peso} required onChange={(e) => handleInputChange(e, 'peso')} />)} />
          <Column header="docura" bodyStyle={{ backgroundColor: '#cfcfc1' }} headerStyle={{ backgroundColor: '#b0e056', fontSize: '22px', fontFamily: 'Inika' }} body={(rowData) => (<InputText value={rowData.docura} required onChange={(e) => handleInputChange(e, 'docura')} />)} />
          <Column header="crocancia" bodyStyle={{ backgroundColor: '#cfcfc1' }} headerStyle={{ backgroundColor: '#b0e056', fontSize: '22px', fontFamily: 'Inika' }} body={(rowData) => (<InputText value={rowData.crocancia} onChange={(e) => handleInputChange(e, 'crocancia')} />)} />
          <Column header="suculencia" bodyStyle={{ backgroundColor: '#cfcfc1' }} headerStyle={{ backgroundColor: '#b0e056', fontSize: '22px', fontFamily: 'Inika' }} body={(rowData) => (<InputText value={rowData.suculencia} onChange={(e) => handleInputChange(e, 'suculencia')} />)} />
          <Column header="maturacao" bodyStyle={{ backgroundColor: '#cfcfc1' }} headerStyle={{ backgroundColor: '#b0e056', fontSize: '22px', fontFamily: 'Inika' }} body={(rowData) => (<InputText value={rowData.maturacao} onChange={(e) => handleInputChange(e, 'maturacao')} />)} />
          <Column header="acidez" bodyStyle={{ backgroundColor: '#cfcfc1' }} headerStyle={{ backgroundColor: '#b0e056', fontSize: '22px', fontFamily: 'Inika' }} body={(rowData) => (<InputText value={rowData.acidez} onChange={(e) => handleInputChange(e, 'acidez')} />)} />
        </DataTable>
      </div>
      <div className='flex justify-content-end mr-8'>
        <Button label="Calcular" onClick={handleFileSubmitt} style={{ fontFamily: 'inika' }} className="button-rounded border-round-lg mt-2 w-2 h-4rem text-2xl text-white bg-orange-900 border-orange-900" />
      </div>
    </div>
  );
};

export default App;
