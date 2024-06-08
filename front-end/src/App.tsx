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
import ISomenteUmaFruta from './interface/ISomenteUmaFruta'
import axios from 'axios';
import { Toast } from 'primereact/toast';
import { Dropdown } from 'primereact/dropdown';

const App = () => {

  let somenteUmaFrutaVazia: ISomenteUmaFruta
  somenteUmaFrutaVazia = {
    area: '',
    perimetro: '',
    eixo_maior: '',
    eixo_menor: '',
    excentricidade: '',
    eqdiasq: '',
    solidez: '',
    area_convexa: '',
    entensao: '',
    proporcao: '',
    redondidade: '',
    compactidade: '',
    fator_forma_1: '',
    fator_forma_2: '',
    fator_forma_3: '',
    fator_forma_4: '',
    RR_media: '',
    RG_media: '',
    RB_media: '',
    RR_dev: '',
    RG_dev: '',
    RB_dev: '',
    RR_inclinacao: '',
    RG_inclinacao: '',
    RB_inclinacao: '',
    RR_curtose: '',
    RG_curtose: '',
    RB_curtose: '',
    RR_entropia: '',
    RG_entropia: '',
    RB_entropia: '',
    RR_all: '',
    RG_all: '',
    RB_all: '',
    classe: '',
  }

  const [modeloSelecionado, setModeloSelecionado] = useState<string>('')
  const [file, setFile] = useState<File | null>(null);
  const [arquivoCSV, setArquivoCSV] = useState<File | null>(null);
  const [caractersticas, setCaractersticas] = useState<ISomenteUmaFruta>(somenteUmaFrutaVazia);
  const caractersticasArray = [caractersticas];
  const toast = useRef<any>(null);

  const opcoesClasse = ['BERHI', 'DEGLET', 'DOKOL', 'IRAQI', 'ROTANA', 'SAFAVI', 'SOGAY'];
  const REGRESSAO_LOGISTICA = "Regressão Logística"

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>, field: keyof ISomenteUmaFruta) => {
    const { value } = e.target;
    setCaractersticas(prevcaractersticas => ({
      ...prevcaractersticas,
      [field]: value
    }));
  };

  const transformarEmString = (fruta: ISomenteUmaFruta) => {
    let stringFruta = '';

    Object.keys(fruta).forEach((key, index) => {
      stringFruta += fruta[key as keyof ISomenteUmaFruta];
      if (index !== Object.keys(fruta).length - 1) {
        stringFruta += ';';
      }
    });

    return stringFruta;
  }

  const handleChoose = (event: any) => {
    const file = event.files[0];
    if (file && file.type === 'text/csv') {
      setArquivoCSV(file);
    } else {
      toast.current.show({ severity: 'warn', summary: 'Aviso', detail: 'Por favor, selecione um arquivo CSV', life: 5000 });
    }
  };

  const todosPreenchidos = Object.keys(caractersticas).every(key => {
    return caractersticas[key as keyof typeof caractersticas] !== null && caractersticas[key as keyof typeof caractersticas] !== "";
  });

  const peloMenosUmPreenchido = Object.keys(caractersticas).some(key => {
    if (key === 'classe') {
      return caractersticas[key as keyof typeof caractersticas] !== "";
    } else {
      return caractersticas[key as keyof typeof caractersticas] !== null;
    }
  });

  const todosVazios = Object.keys(caractersticas).every(key => {
    if (key === 'classe') {
      return caractersticas[key as keyof typeof caractersticas] === "";
    } else {
      return caractersticas[key as keyof typeof caractersticas] === null;
    }
  });

  const verificacoes = (): boolean => {
    if (modeloSelecionado == '') {
      toast.current.show({ severity: 'error', summary: 'Erro', detail: 'Escolha um Modelo', life: 5000 });
      return false
    }

    if (!arquivoCSV && peloMenosUmPreenchido) {
      toast.current.show({ severity: 'warn', summary: 'Aviso', detail: 'Preencha todos os Campos antes de Calcular Somente Uma Fruta', life: 5000 });
      return false
    }

    if (arquivoCSV && peloMenosUmPreenchido || !arquivoCSV && todosVazios) {
      toast.current.show({ severity: 'warn', summary: 'Aviso', detail: 'Escolha Múltiplas Frutas ou Somente uma Fruta', life: 5000 });
      return false
    }

    if (!arquivoCSV && todosPreenchidos) {
      return true
    }

    return true
  }

  const handleFileSubmit = async () => {
    if (verificacoes()) {
      if (modeloSelecionado == REGRESSAO_LOGISTICA) {
        analiseModeloRegLog()
      } else {
        analiseModeloArvDec()
      }
      console.log(modeloSelecionado)
      console.log(caractersticas)
      console.log(transformarEmString(caractersticas))
      console.log(arquivoCSV)
      toast.current.show({ severity: 'success', summary: 'Sucesso', detail: 'Passou!!!', life: 5000 });
    }
  };

  const analiseModeloRegLog = async () => {
    if (!arquivoCSV && todosPreenchidos) {
      //Requisição Modelo Regressão Lógica e Somente uma Fruta
    } else if (arquivoCSV && todosVazios) {
      //Requisição Modelo Regressão Lógica e Múltiplas Frutas
    }
  }

  const analiseModeloArvDec = async () => {
    if (!arquivoCSV && todosPreenchidos) {
      //Requisição Modelo Árvore de Decisão e Somente uma Fruta
    } else if (arquivoCSV && todosVazios) {
      //Requisição Modelo Árvore de Decisão e Múltiplas Frutas
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
            <p className='ml-3 font-bold text-4xl mr-3' style={{ fontFamily: 'Inika' }}>Visualizar Múltiplas Frutas:</p>
          </div>
          <FileUpload className='border-blue-900 border-solid border-round-md' accept=".csv" maxFileSize={1000000} onSelect={handleChoose} emptyTemplate={<p className="m-0">Arraste e Solte o Arquivo CSV Aqui</p>} />
        </div>
      </div>
      <div className='ml-3 mr-3 h-16rem'>
        <p className='font-bold text-4xl' style={{ fontFamily: 'Inika' }} >Calcular Somente uma Fruta:</p>

        <DataTable className='border-blue-900 border-solid border-round-md' value={caractersticasArray}  >
          <Column header="area" bodyStyle={{ backgroundColor: '#cfcfc1' }} headerStyle={{ backgroundColor: '#b0e056', fontSize: '22px', fontFamily: 'Inika' }} body={(rowData) => (<InputNumber value={rowData.area} required onValueChange={(e: any) => handleInputChange(e, 'area')} mode="decimal" />)} />
          <Column header="perimetro" bodyStyle={{ backgroundColor: '#cfcfc1' }} headerStyle={{ backgroundColor: '#b0e056', fontSize: '22px', fontFamily: 'Inika' }} body={(rowData) => (<InputNumber value={rowData.perimetro} required onValueChange={(e: any) => handleInputChange(e, 'perimetro')} mode="decimal" max={10000000000} minFractionDigits={0} maxFractionDigits={5} step={0.00001} />)} />
          <Column header="eixo_maior" bodyStyle={{ backgroundColor: '#cfcfc1' }} headerStyle={{ backgroundColor: '#b0e056', fontSize: '22px', fontFamily: 'Inika' }} body={(rowData) => (<InputNumber value={rowData.eixo_maior} required onValueChange={(e: any) => handleInputChange(e, 'eixo_maior')} mode="decimal" max={10000000000} minFractionDigits={0} maxFractionDigits={5} step={0.00001} />)} />
          <Column header="eixo_menor" bodyStyle={{ backgroundColor: '#cfcfc1' }} headerStyle={{ backgroundColor: '#b0e056', fontSize: '22px', fontFamily: 'Inika' }} body={(rowData) => (<InputNumber value={rowData.eixo_menor} onValueChange={(e: any) => handleInputChange(e, 'eixo_menor')} mode="decimal" max={10000000000} minFractionDigits={0} maxFractionDigits={5} step={0.00001} />)} />
          <Column header="excentricidade" bodyStyle={{ backgroundColor: '#cfcfc1' }} headerStyle={{ backgroundColor: '#b0e056', fontSize: '22px', fontFamily: 'Inika' }} body={(rowData) => (<InputNumber value={rowData.excentricidade} onValueChange={(e: any) => handleInputChange(e, 'excentricidade')} mode="decimal" max={10000000000} minFractionDigits={0} maxFractionDigits={5} step={0.00001} />)} />
          <Column header="eqdiasq" bodyStyle={{ backgroundColor: '#cfcfc1' }} headerStyle={{ backgroundColor: '#b0e056', fontSize: '22px', fontFamily: 'Inika' }} body={(rowData) => (<InputNumber value={rowData.eqdiasq} onValueChange={(e: any) => handleInputChange(e, 'eqdiasq')} mode="decimal" max={10000000000} minFractionDigits={0} maxFractionDigits={5} step={0.00001} />)} />
          <Column header="solidez" bodyStyle={{ backgroundColor: '#cfcfc1' }} headerStyle={{ backgroundColor: '#b0e056', fontSize: '22px', fontFamily: 'Inika' }} body={(rowData) => (<InputNumber value={rowData.solidez} onValueChange={(e: any) => handleInputChange(e, 'solidez')} mode="decimal" max={10000000000} minFractionDigits={0} maxFractionDigits={5} step={0.00001} />)} />
          <Column header="area_convexa" bodyStyle={{ backgroundColor: '#cfcfc1' }} headerStyle={{ backgroundColor: '#b0e056', fontSize: '22px', fontFamily: 'Inika' }} body={(rowData) => (<InputNumber value={rowData.area_convexa} onValueChange={(e: any) => handleInputChange(e, 'area_convexa')} mode="decimal" max={10000000000} minFractionDigits={0} maxFractionDigits={5} step={0.00001} />)} />
          <Column header="entensao" bodyStyle={{ backgroundColor: '#cfcfc1' }} headerStyle={{ backgroundColor: '#b0e056', fontSize: '22px', fontFamily: 'Inika' }} body={(rowData) => (<InputNumber value={rowData.entensao} onValueChange={(e: any) => handleInputChange(e, 'entensao')} mode="decimal" max={10000000000} minFractionDigits={0} maxFractionDigits={5} step={0.00001} />)} />
          <Column header="proporcao" bodyStyle={{ backgroundColor: '#cfcfc1' }} headerStyle={{ backgroundColor: '#b0e056', fontSize: '22px', fontFamily: 'Inika' }} body={(rowData) => (<InputNumber value={rowData.proporcao} onValueChange={(e: any) => handleInputChange(e, 'proporcao')} mode="decimal" max={10000000000} minFractionDigits={0} maxFractionDigits={5} step={0.00001} />)} />
          <Column header="redondidade" bodyStyle={{ backgroundColor: '#cfcfc1' }} headerStyle={{ backgroundColor: '#b0e056', fontSize: '22px', fontFamily: 'Inika' }} body={(rowData) => (<InputNumber value={rowData.redondidade} onValueChange={(e: any) => handleInputChange(e, 'redondidade')} mode="decimal" max={10000000000} minFractionDigits={0} maxFractionDigits={5} step={0.00001} />)} />
          <Column header="compactidade" bodyStyle={{ backgroundColor: '#cfcfc1' }} headerStyle={{ backgroundColor: '#b0e056', fontSize: '22px', fontFamily: 'Inika' }} body={(rowData) => (<InputNumber value={rowData.compactidade} onValueChange={(e: any) => handleInputChange(e, 'compactidade')} mode="decimal" max={10000000000} minFractionDigits={0} maxFractionDigits={5} step={0.00001} />)} />
          <Column header="fator_forma_1" bodyStyle={{ backgroundColor: '#cfcfc1' }} headerStyle={{ backgroundColor: '#b0e056', fontSize: '22px', fontFamily: 'Inika' }} body={(rowData) => (<InputNumber value={rowData.fator_forma_1} onValueChange={(e: any) => handleInputChange(e, 'fator_forma_1')} mode="decimal" max={10000000000} minFractionDigits={0} maxFractionDigits={5} step={0.00001} />)} />
          <Column header="fator_forma_2" bodyStyle={{ backgroundColor: '#cfcfc1' }} headerStyle={{ backgroundColor: '#b0e056', fontSize: '22px', fontFamily: 'Inika' }} body={(rowData) => (<InputNumber value={rowData.fator_forma_2} onValueChange={(e: any) => handleInputChange(e, 'fator_forma_2')} mode="decimal" max={10000000000} minFractionDigits={0} maxFractionDigits={5} step={0.00001} />)} />
          <Column header="fator_forma_3" bodyStyle={{ backgroundColor: '#cfcfc1' }} headerStyle={{ backgroundColor: '#b0e056', fontSize: '22px', fontFamily: 'Inika' }} body={(rowData) => (<InputNumber value={rowData.fator_forma_3} onValueChange={(e: any) => handleInputChange(e, 'fator_forma_3')} mode="decimal" max={10000000000} minFractionDigits={0} maxFractionDigits={5} step={0.00001} />)} />
          <Column header="fator_forma_4" bodyStyle={{ backgroundColor: '#cfcfc1' }} headerStyle={{ backgroundColor: '#b0e056', fontSize: '22px', fontFamily: 'Inika' }} body={(rowData) => (<InputNumber value={rowData.fator_forma_4} onValueChange={(e: any) => handleInputChange(e, 'fator_forma_4')} mode="decimal" max={10000000000} minFractionDigits={0} maxFractionDigits={5} step={0.00001} />)} />
          <Column header="RR_media" bodyStyle={{ backgroundColor: '#cfcfc1' }} headerStyle={{ backgroundColor: '#b0e056', fontSize: '22px', fontFamily: 'Inika' }} body={(rowData) => (<InputNumber value={rowData.RR_media} onValueChange={(e: any) => handleInputChange(e, 'RR_media')} mode="decimal" max={10000000000} minFractionDigits={0} maxFractionDigits={5} step={0.00001} />)} />
          <Column header="RG_media" bodyStyle={{ backgroundColor: '#cfcfc1' }} headerStyle={{ backgroundColor: '#b0e056', fontSize: '22px', fontFamily: 'Inika' }} body={(rowData) => (<InputNumber value={rowData.RG_media} onValueChange={(e: any) => handleInputChange(e, 'RG_media')} mode="decimal" max={10000000000} minFractionDigits={0} maxFractionDigits={5} step={0.00001} />)} />
          <Column header="RB_media" bodyStyle={{ backgroundColor: '#cfcfc1' }} headerStyle={{ backgroundColor: '#b0e056', fontSize: '22px', fontFamily: 'Inika' }} body={(rowData) => (<InputNumber value={rowData.RB_media} onValueChange={(e: any) => handleInputChange(e, 'RB_media')} mode="decimal" max={10000000000} minFractionDigits={0} maxFractionDigits={5} step={0.00001} />)} />
          <Column header="RR_dev" bodyStyle={{ backgroundColor: '#cfcfc1' }} headerStyle={{ backgroundColor: '#b0e056', fontSize: '22px', fontFamily: 'Inika' }} body={(rowData) => (<InputNumber value={rowData.RR_dev} onValueChange={(e: any) => handleInputChange(e, 'RR_dev')} mode="decimal" max={10000000000} minFractionDigits={0} maxFractionDigits={5} step={0.00001} />)} />
          <Column header="RG_dev" bodyStyle={{ backgroundColor: '#cfcfc1' }} headerStyle={{ backgroundColor: '#b0e056', fontSize: '22px', fontFamily: 'Inika' }} body={(rowData) => (<InputNumber value={rowData.RG_dev} onValueChange={(e: any) => handleInputChange(e, 'RG_dev')} mode="decimal" max={10000000000} minFractionDigits={0} maxFractionDigits={5} step={0.00001} />)} />
          <Column header="RB_dev" bodyStyle={{ backgroundColor: '#cfcfc1' }} headerStyle={{ backgroundColor: '#b0e056', fontSize: '22px', fontFamily: 'Inika' }} body={(rowData) => (<InputNumber value={rowData.RB_dev} onValueChange={(e: any) => handleInputChange(e, 'RB_dev')} mode="decimal" max={10000000000} minFractionDigits={0} maxFractionDigits={5} step={0.00001} />)} />
          <Column header="RR_inclinacao" bodyStyle={{ backgroundColor: '#cfcfc1' }} headerStyle={{ backgroundColor: '#b0e056', fontSize: '22px', fontFamily: 'Inika' }} body={(rowData) => (<InputNumber value={rowData.RR_inclinacao} onValueChange={(e: any) => handleInputChange(e, 'RR_inclinacao')} mode="decimal" max={10000000000} minFractionDigits={0} maxFractionDigits={5} step={0.00001} />)} />
          <Column header="RG_inclinacao" bodyStyle={{ backgroundColor: '#cfcfc1' }} headerStyle={{ backgroundColor: '#b0e056', fontSize: '22px', fontFamily: 'Inika' }} body={(rowData) => (<InputNumber value={rowData.RG_inclinacao} onValueChange={(e: any) => handleInputChange(e, 'RG_inclinacao')} mode="decimal" max={10000000000} minFractionDigits={0} maxFractionDigits={5} step={0.00001} />)} />
          <Column header="RB_inclinacao" bodyStyle={{ backgroundColor: '#cfcfc1' }} headerStyle={{ backgroundColor: '#b0e056', fontSize: '22px', fontFamily: 'Inika' }} body={(rowData) => (<InputNumber value={rowData.RB_inclinacao} onValueChange={(e: any) => handleInputChange(e, 'RB_inclinacao')} mode="decimal" max={10000000000} minFractionDigits={0} maxFractionDigits={5} step={0.00001} />)} />
          <Column header="RR_curtose" bodyStyle={{ backgroundColor: '#cfcfc1' }} headerStyle={{ backgroundColor: '#b0e056', fontSize: '22px', fontFamily: 'Inika' }} body={(rowData) => (<InputNumber value={rowData.RR_curtose} onValueChange={(e: any) => handleInputChange(e, 'RR_curtose')} mode="decimal" max={10000000000} minFractionDigits={0} maxFractionDigits={5} step={0.00001} />)} />
          <Column header="RG_curtose" bodyStyle={{ backgroundColor: '#cfcfc1' }} headerStyle={{ backgroundColor: '#b0e056', fontSize: '22px', fontFamily: 'Inika' }} body={(rowData) => (<InputNumber value={rowData.RG_curtose} onValueChange={(e: any) => handleInputChange(e, 'RG_curtose')} mode="decimal" max={10000000000} minFractionDigits={0} maxFractionDigits={5} step={0.00001} />)} />
          <Column header="RB_curtose" bodyStyle={{ backgroundColor: '#cfcfc1' }} headerStyle={{ backgroundColor: '#b0e056', fontSize: '22px', fontFamily: 'Inika' }} body={(rowData) => (<InputNumber value={rowData.RB_curtose} onValueChange={(e: any) => handleInputChange(e, 'RB_curtose')} mode="decimal" max={10000000000} minFractionDigits={0} maxFractionDigits={5} step={0.00001} />)} />
          <Column header="RR_entropia" bodyStyle={{ backgroundColor: '#cfcfc1' }} headerStyle={{ backgroundColor: '#b0e056', fontSize: '22px', fontFamily: 'Inika' }} body={(rowData) => (<InputNumber value={rowData.RR_entropia} onValueChange={(e: any) => handleInputChange(e, 'RR_entropia')} mode="decimal" max={10000000000} minFractionDigits={0} maxFractionDigits={5} step={0.00001} />)} />
          <Column header="RG_entropia" bodyStyle={{ backgroundColor: '#cfcfc1' }} headerStyle={{ backgroundColor: '#b0e056', fontSize: '22px', fontFamily: 'Inika' }} body={(rowData) => (<InputNumber value={rowData.RG_entropia} onValueChange={(e: any) => handleInputChange(e, 'RG_entropia')} mode="decimal" max={10000000000} minFractionDigits={0} maxFractionDigits={5} step={0.00001} />)} />
          <Column header="RB_entropia" bodyStyle={{ backgroundColor: '#cfcfc1' }} headerStyle={{ backgroundColor: '#b0e056', fontSize: '22px', fontFamily: 'Inika' }} body={(rowData) => (<InputNumber value={rowData.RB_entropia} onValueChange={(e: any) => handleInputChange(e, 'RB_entropia')} mode="decimal" max={10000000000} minFractionDigits={0} maxFractionDigits={5} step={0.00001} />)} />
          <Column header="RR_all" bodyStyle={{ backgroundColor: '#cfcfc1' }} headerStyle={{ backgroundColor: '#b0e056', fontSize: '22px', fontFamily: 'Inika' }} body={(rowData) => (<InputNumber value={rowData.RR_all} onValueChange={(e: any) => handleInputChange(e, 'RR_all')} mode="decimal" max={10000000000} minFractionDigits={0} maxFractionDigits={5} step={0.00001} />)} />
          <Column header="RG_all" bodyStyle={{ backgroundColor: '#cfcfc1' }} headerStyle={{ backgroundColor: '#b0e056', fontSize: '22px', fontFamily: 'Inika' }} body={(rowData) => (<InputNumber value={rowData.RG_all} onValueChange={(e: any) => handleInputChange(e, 'RG_all')} mode="decimal" max={10000000000} minFractionDigits={0} maxFractionDigits={5} step={0.00001} />)} />
          <Column header="RB_all" bodyStyle={{ backgroundColor: '#cfcfc1' }} headerStyle={{ backgroundColor: '#b0e056', fontSize: '22px', fontFamily: 'Inika' }} body={(rowData) => (<InputNumber value={rowData.RB_all} onValueChange={(e: any) => handleInputChange(e, 'RB_all')} mode="decimal" max={10000000000} minFractionDigits={0} maxFractionDigits={5} step={0.00001} />)} />
          <Column header="classe" bodyStyle={{ backgroundColor: '#cfcfc1' }} headerStyle={{ backgroundColor: '#b0e056', fontSize: '22px', fontFamily: 'Inika' }} body={(rowData) => (<Dropdown value={rowData.classe} options={opcoesClasse.map(opcao => ({ label: opcao, value: opcao }))} onChange={(e: any) => handleInputChange(e, 'classe')} />
          )}
          />
        </DataTable>
      </div>
      <div className='flex justify-content-end mr-8'>
        <Button label="Calcular" onClick={handleFileSubmit} style={{ fontFamily: 'inika' }} className="button-rounded border-round-lg mt-2 w-2 h-4rem text-2xl text-white bg-orange-900 border-orange-900" />
      </div>
    </div>
  );
};

export default App;
