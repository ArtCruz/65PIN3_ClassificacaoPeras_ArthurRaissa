import React, { useState } from 'react';
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

const App = () => {
  const [products, setProducts] = useState([
    { area: '', perimetro: '', eixo_maior: '', eixo_menor: '', excentricidade: '', eqdiasq: '', solidez: '' }
  ]);

  const handleInputChange = (e: any, field: any) => {
    const { value } = e.target;
    // Ensure the value is numeric
    if (/^\d*$/.test(value)) {
      // Update the state or perform any necessary action with the new value
    }
  };

  return (
    <div style={{ backgroundColor: '##FFFACD' }}>
      <h1 className="text-center text-6xl font-bold text-white p-4" style={{ backgroundColor: '#8FBC8F', fontFamily: 'Inika' }}>MyFruit</h1>
      <div className="col-12">
        <div className='flex' style={{ backgroundColor: 'red' }}>
          <p className='ml-3 font-bold text-4xl' style={{ fontFamily: 'Inika' }}>Visualizar Multiplas Frutas:</p>
          <FileUpload className="ml-3 align-content-center w-6 p-3 bg-orange-900" headerClassName="custom-header" mode="basic" chooseLabel='Importar Tabela' name="tabelaFrutas" url="" accept="image/*" maxFileSize={1000000} />
          <div className="flex flex-column align-content-between" style={{ backgroundColor: 'purple' }}>
            <div className="align-items-center">
              <RadioButton inputId="ingredient1" name="pizza" value="Cheese" />
              <label htmlFor="ingredient1" className="ml-2">Cheese</label>
            </div>
            <div className="align-items-center">
              <RadioButton inputId="ingredient2" name="pizza" value="Mushroom" />
              <label htmlFor="ingredient2" className="ml-2">Mushroom</label>
            </div>
          </div>
        </div>

      </div>

      <div style={{ backgroundColor: 'yellow' }} className='m-3 h-20rem'>
        <p className='font-bold text-4xl' style={{ fontFamily: 'Inika' }} >Calcular Somente uma Fruta:</p>

        <DataTable value={products}>
          <Column header="area" body={(rowData) => (<InputNumber value={rowData.area} onValueChange={(e) => handleInputChange(e, 'area')} mode="decimal" max={100000} minFractionDigits={0} maxFractionDigits={5} step={0.00001} />)} />
          <Column header="perimetro" body={(rowData) => (<InputNumber value={rowData.perimetro} onValueChange={(e) => handleInputChange(e, 'perimetro')} mode="decimal" max={100000} minFractionDigits={0} maxFractionDigits={5} step={0.00001} />)} />
          <Column header="eixo_maior" body={(rowData) => (<InputNumber value={rowData.eixo_maior} onValueChange={(e) => handleInputChange(e, 'eixo_maior')} mode="decimal" max={100000} minFractionDigits={0} maxFractionDigits={5} step={0.00001} />)} />
          <Column header="eixo_menor" body={(rowData) => (<InputNumber value={rowData.eixo_menor} onValueChange={(e) => handleInputChange(e, 'eixo_menor')} mode="decimal" max={100000} minFractionDigits={0} maxFractionDigits={5} step={0.00001} />)} />
          <Column header="excentricidade" body={(rowData) => (<InputNumber value={rowData.excentricidade} onValueChange={(e) => handleInputChange(e, 'excentricidade')} mode="decimal" max={100000} minFractionDigits={0} maxFractionDigits={5} step={0.00001} />)} />
          <Column header="eqdiasq" body={(rowData) => (<InputNumber value={rowData.eqdiasq} onValueChange={(e) => handleInputChange(e, 'eqdiasq')} mode="decimal" max={100000} minFractionDigits={0} maxFractionDigits={5} step={0.00001} />)} />
          <Column header="solidez" body={(rowData) => (<InputNumber value={rowData.solidez} onValueChange={(e) => handleInputChange(e, 'solidez')} mode="decimal" max={100000} minFractionDigits={0} maxFractionDigits={5} step={0.00001} />)} />
          <Column header="area_convexa" body={(rowData) => (<InputNumber value={rowData.area_convexa} onValueChange={(e) => handleInputChange(e, 'area_convexa')} mode="decimal" max={100000} minFractionDigits={0} maxFractionDigits={5} step={0.00001} />)} />
          <Column header="entensao" body={(rowData) => (<InputNumber value={rowData.entensao} onValueChange={(e) => handleInputChange(e, 'entensao')} mode="decimal" max={100000} minFractionDigits={0} maxFractionDigits={5} step={0.00001} />)} />
          <Column header="proporcao" body={(rowData) => (<InputNumber value={rowData.proporcao} onValueChange={(e) => handleInputChange(e, 'proporcao')} mode="decimal" max={100000} minFractionDigits={0} maxFractionDigits={5} step={0.00001} />)} />
          <Column header="redondidade" body={(rowData) => (<InputNumber value={rowData.redondidade} onValueChange={(e) => handleInputChange(e, 'redondidade')} mode="decimal" max={100000} minFractionDigits={0} maxFractionDigits={5} step={0.00001} />)} />
          <Column header="compactidade" body={(rowData) => (<InputNumber value={rowData.compactidade} onValueChange={(e) => handleInputChange(e, 'compactidade')} mode="decimal" max={100000} minFractionDigits={0} maxFractionDigits={5} step={0.00001} />)} />
          <Column header="fator_forma_1" body={(rowData) => (<InputNumber value={rowData.fator_forma_1} onValueChange={(e) => handleInputChange(e, 'fator_forma_1')} mode="decimal" max={100000} minFractionDigits={0} maxFractionDigits={5} step={0.00001} />)} />
          <Column header="fator_forma_2" body={(rowData) => (<InputNumber value={rowData.fator_forma_2} onValueChange={(e) => handleInputChange(e, 'fator_forma_2')} mode="decimal" max={100000} minFractionDigits={0} maxFractionDigits={5} step={0.00001} />)} />
          <Column header="fator_forma_3" body={(rowData) => (<InputNumber value={rowData.fator_forma_3} onValueChange={(e) => handleInputChange(e, 'fator_forma_3')} mode="decimal" max={100000} minFractionDigits={0} maxFractionDigits={5} step={0.00001} />)} />
          <Column header="fator_forma_4" body={(rowData) => (<InputNumber value={rowData.fator_forma_4} onValueChange={(e) => handleInputChange(e, 'fator_forma_4')} mode="decimal" max={100000} minFractionDigits={0} maxFractionDigits={5} step={0.00001} />)} />
          <Column header="RR_media" body={(rowData) => (<InputNumber value={rowData.RR_media} onValueChange={(e) => handleInputChange(e, 'RR_media')} mode="decimal" max={100000} minFractionDigits={0} maxFractionDigits={5} step={0.00001} />)} />
          <Column header="RG_media" body={(rowData) => (<InputNumber value={rowData.RG_media} onValueChange={(e) => handleInputChange(e, 'RG_media')} mode="decimal" max={100000} minFractionDigits={0} maxFractionDigits={5} step={0.00001} />)} />
          <Column header="RB_media" body={(rowData) => (<InputNumber value={rowData.RB_media} onValueChange={(e) => handleInputChange(e, 'RB_media')} mode="decimal" max={100000} minFractionDigits={0} maxFractionDigits={5} step={0.00001} />)} />
          <Column header="RR_dev" body={(rowData) => (<InputNumber value={rowData.RR_dev} onValueChange={(e) => handleInputChange(e, 'RR_dev')} mode="decimal" max={100000} minFractionDigits={0} maxFractionDigits={5} step={0.00001} />)} />
          <Column header="RG_dev" body={(rowData) => (<InputNumber value={rowData.RG_dev} onValueChange={(e) => handleInputChange(e, 'RG_dev')} mode="decimal" max={100000} minFractionDigits={0} maxFractionDigits={5} step={0.00001} />)} />
          <Column header="RB_dev" body={(rowData) => (<InputNumber value={rowData.RB_dev} onValueChange={(e) => handleInputChange(e, 'RB_dev')} mode="decimal" max={100000} minFractionDigits={0} maxFractionDigits={5} step={0.00001} />)} />
          <Column header="RR_inclinacao" body={(rowData) => (<InputNumber value={rowData.RR_inclinacao} onValueChange={(e) => handleInputChange(e, 'RR_inclinacao')} mode="decimal" max={100000} minFractionDigits={0} maxFractionDigits={5} step={0.00001} />)} />
          <Column header="RG_inclinacao" body={(rowData) => (<InputNumber value={rowData.RG_inclinacao} onValueChange={(e) => handleInputChange(e, 'RG_inclinacao')} mode="decimal" max={100000} minFractionDigits={0} maxFractionDigits={5} step={0.00001} />)} />
          <Column header="RB_inclinacao" body={(rowData) => (<InputNumber value={rowData.RB_inclinacao} onValueChange={(e) => handleInputChange(e, 'RB_inclinacao')} mode="decimal" max={100000} minFractionDigits={0} maxFractionDigits={5} step={0.00001} />)} />
          <Column header="RR_curtose" body={(rowData) => (<InputNumber value={rowData.RR_curtose} onValueChange={(e) => handleInputChange(e, 'RR_curtose')} mode="decimal" max={100000} minFractionDigits={0} maxFractionDigits={5} step={0.00001} />)} />
          <Column header="RG_curtose" body={(rowData) => (<InputNumber value={rowData.RG_curtose} onValueChange={(e) => handleInputChange(e, 'RG_curtose')} mode="decimal" max={100000} minFractionDigits={0} maxFractionDigits={5} step={0.00001} />)} />
          <Column header="RB_curtose" body={(rowData) => (<InputNumber value={rowData.RB_curtose} onValueChange={(e) => handleInputChange(e, 'RB_curtose')} mode="decimal" max={100000} minFractionDigits={0} maxFractionDigits={5} step={0.00001} />)} />
          <Column header="RR_entropia" body={(rowData) => (<InputNumber value={rowData.RR_entropia} onValueChange={(e) => handleInputChange(e, 'RR_entropia')} mode="decimal" max={100000} minFractionDigits={0} maxFractionDigits={5} step={0.00001} />)} />
          <Column header="RG_entropia" body={(rowData) => (<InputNumber value={rowData.RG_entropia} onValueChange={(e) => handleInputChange(e, 'RG_entropia')} mode="decimal" max={100000} minFractionDigits={0} maxFractionDigits={5} step={0.00001} />)} />
          <Column header="RB_entropia" body={(rowData) => (<InputNumber value={rowData.RB_entropia} onValueChange={(e) => handleInputChange(e, 'RB_entropia')} mode="decimal" max={100000} minFractionDigits={0} maxFractionDigits={5} step={0.00001} />)} />
          <Column header="RR_all" body={(rowData) => (<InputNumber value={rowData.RR_all} onValueChange={(e) => handleInputChange(e, 'RR_all')} mode="decimal" max={100000} minFractionDigits={0} maxFractionDigits={5} step={0.00001} />)} />
          <Column header="RG_all" body={(rowData) => (<InputNumber value={rowData.RG_all} onValueChange={(e) => handleInputChange(e, 'RG_all')} mode="decimal" max={100000} minFractionDigits={0} maxFractionDigits={5} step={0.00001} />)} />
          <Column header="RB_all" body={(rowData) => (<InputNumber value={rowData.RB_all} onValueChange={(e) => handleInputChange(e, 'RB_all')} mode="decimal" max={100000} minFractionDigits={0} maxFractionDigits={5} step={0.00001} />)} />
          <Column header="classe" body={(rowData) => (<InputNumber value={rowData.classe} onValueChange={(e) => handleInputChange(e, 'classe')} mode="decimal" max={100000} minFractionDigits={0} maxFractionDigits={5} step={0.00001} />)} />
        </DataTable>
        {/* <DataTable editMode='cell' value={products} className="border-round-lg" >
          <Column field="area" header="area"  body={(rowData) => <InputText value={rowData.area} onChange={(e) => handleInputChange(e, 'area')} type='number' />} />
          <Column field="perimetro" header="perimetro" body={(rowData) => <InputText value={rowData.perimetro} onChange={(e) => handleInputChange(e, 'perimetro')} />} />
          <Column field="eixo_maior" header="eixo_maior" body={(rowData) => <InputText value={rowData.eixo_maior} onChange={(e) => handleInputChange(e, 'eixo_maior')} />} />
          <Column field="eixo_menor" header="eixo_menor" body={(rowData) => <InputText value={rowData.eixo_menor} onChange={(e) => handleInputChange(e, 'eixo_menor')} />} />
          <Column field="excentricidade" header="excentricidade" body={(rowData) => <InputText value={rowData.excentricidade} onChange={(e) => handleInputChange(e, 'excentricidade')} />} />
          <Column field="eqdiasq" header="eqdiasq" body={(rowData) => <InputText value={rowData.eqdiasq} onChange={(e) => handleInputChange(e, 'eqdiasq')} />} />
          <Column field="solidez" header="solidez" body={(rowData) => <InputText value={rowData.solidez} onChange={(e) => handleInputChange(e, 'solidez')} />} />
          <Column field="area_convexa" header="area_convexa" body={(rowData) => <InputText value={rowData.area_convexa} onChange={(e) => handleInputChange(e, 'area_convexa')} />} />
          <Column field="entensao" header="extensao" body={(rowData) => <InputText value={rowData.extensao} onChange={(e) => handleInputChange(e, 'extensao')} />} />
          <Column field="proporcao" header="proporcao" body={(rowData) => <InputText value={rowData.proporcao} onChange={(e) => handleInputChange(e, 'proporcao')} />} />
          <Column field="redondidade" header="redondidade" body={(rowData) => <InputText value={rowData.redondidade} onChange={(e) => handleInputChange(e, 'redondidade')} />} />
          <Column field="compactidade" header="compactidade" body={(rowData) => <InputText value={rowData.compactidade} onChange={(e) => handleInputChange(e, 'compactidade')} />} />
          <Column field="fator_forma_1" header="fator_forma_1" body={(rowData) => <InputText value={rowData.fator_forma_1} onChange={(e) => handleInputChange(e, 'fator_forma_1')} />} />
          <Column field="fator_forma_2" header="fator_forma_2" body={(rowData) => <InputText value={rowData.fator_forma_2} onChange={(e) => handleInputChange(e, 'fator_forma_2')} />} />
          <Column field="fator_forma_3" header="fator_forma_3" body={(rowData) => <InputText value={rowData.fator_forma_3} onChange={(e) => handleInputChange(e, 'fator_forma_3')} />} />
          <Column field="fator_forma_4" header="fator_forma_4" body={(rowData) => <InputText value={rowData.fator_forma_4} onChange={(e) => handleInputChange(e, 'fator_forma_4')} />} />
          <Column field="RR_media" header="RR_media" body={(rowData) => <InputText value={rowData.RR_media} onChange={(e) => handleInputChange(e, 'RR_media')} />} />
          <Column field="RG_media" header="RG_media" body={(rowData) => <InputText value={rowData.RG_media} onChange={(e) => handleInputChange(e, 'RG_media')} />} />
          <Column field="RB_media" header="RB_media" body={(rowData) => <InputText value={rowData.RB_media} onChange={(e) => handleInputChange(e, 'RB_media')} />} />
          <Column field="RR_dev" header="RR_dev" body={(rowData) => <InputText value={rowData.RR_dev} onChange={(e) => handleInputChange(e, 'RR_dev')} />} />
          <Column field="RG_dev" header="RG_dev" body={(rowData) => <InputText value={rowData.RG_dev} onChange={(e) => handleInputChange(e, 'RG_dev')} />} />
          <Column field="RB_dev" header="RB_dev" body={(rowData) => <InputText value={rowData.RB_dev} onChange={(e) => handleInputChange(e, 'RB_dev')} />} />
          <Column field="RR_inclinacao" header="RR_inclinacao" body={(rowData) => <InputText value={rowData.RR_inclinacao} onChange={(e) => handleInputChange(e, 'RR_inclinacao')} />} />
          <Column field="RG_inclinacao" header="RG_inclinacao" body={(rowData) => <InputText value={rowData.RG_inclinacao} onChange={(e) => handleInputChange(e, 'RG_inclinacao')} />} />
          <Column field="RB_inclinacao" header="RB_inclinacao" body={(rowData) => <InputText value={rowData.RB_inclinacao} onChange={(e) => handleInputChange(e, 'RB_inclinacao')} />} />
          <Column field="RR_curtose" header="RR_curtose" body={(rowData) => <InputText value={rowData.RR_curtose} onChange={(e) => handleInputChange(e, 'RR_curtose')} />} />
          <Column field="RG_curtose" header="RG_curtose" body={(rowData) => <InputText value={rowData.RG_curtose} onChange={(e) => handleInputChange(e, 'RG_curtose')} />} />
          <Column field="RB_curtose" header="RB_curtose" body={(rowData) => <InputText value={rowData.RB_curtose} onChange={(e) => handleInputChange(e, 'RB_curtose')} />} />
          <Column field="RR_entropia" header="RR_entropia" body={(rowData) => <InputText value={rowData.RR_entropia} onChange={(e) => handleInputChange(e, 'RR_entropia')} />} />
          <Column field="RG_entropia" header="RG_entropia" body={(rowData) => <InputText value={rowData.RG_entropia} onChange={(e) => handleInputChange(e, 'RG_entropia')} />} />
          <Column field="RB_entropia" header="RB_entropia" body={(rowData) => <InputText value={rowData.RB_entropia} onChange={(e) => handleInputChange(e, 'RB_entropia')} />} />
          <Column field="RR_all" header="RR_all" body={(rowData) => <InputText value={rowData.RR_all} onChange={(e) => handleInputChange(e, 'RR_all')} />} />
          <Column field="RG_all" header="RR_curtose" body={(rowData) => <InputText value={rowData.RR_curtose} onChange={(e) => handleInputChange(e, 'RR_curtose')} />} />
          <Column field="RB_all" header="RB_all" body={(rowData) => <InputText value={rowData.RB_all} onChange={(e) => handleInputChange(e, 'RB_all')} />} />
          <Column field="classe" header="classe" body={(rowData) => <InputText value={rowData.classe} onChange={(e) => handleInputChange(e, 'classe')} />} />
        </DataTable> */}
      </div>

      <div style={{ background: 'green' }} className='flex justify-content-end mr-8'>
        <Button label="Calcular" style={{ fontFamily: 'inika' }} className="button-rounded border-round-lg mt-2 w-2 h-4rem text-2xl text-white bg-orange-900 border-orange-900" />
      </div>
    </div>
  );
};

export default App;
