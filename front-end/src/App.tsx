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

const App = () => {
  const [products, setProducts] = useState([
    { area: '', perimetro: '', eixo_maior: '', eixo_menor: '', excentricidade: '', eqdiasq: '', solidez: '' }
  ]);

  const handleInputChange = (e: any, field: any) => {
    const newValue = e.target.value;
    setProducts((prevProducts) => {
      const updatedProducts = [...prevProducts];
      
      return updatedProducts;
    });
  };

  return (
        <div className="" style={{ backgroundColor: '#f9f6f1' }}>
          <h1 className="text-center" style={{ backgroundColor: '#8FBC8F', padding: '10px', fontStyle: 'arial' }}>MyFruit</h1>
          <div className="grid">
            <div className="col-12 md-6">
              <h4 className='m-3 text-3xl'>Visualizar Multiplas Frutas:</h4>
              <FileUpload className="m-3 p-3 " style={{backgroundColor: 'red'}} headerClassName="custom-header" mode="basic" chooseLabel='Importar Tabela' name="tabelaFrutas" url="" accept="image/*" maxFileSize={1000000} />
              <h4 className='m-3 text-3xl'>Calcular Somente uma Fruta:</h4>

              <DataTable value={products} className="m-3">
                <Column field="area" header="area" body={(rowData) => <InputText value={rowData.area} onChange={(e) => handleInputChange(e, 'area')} />} />
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
              </DataTable>
              <Button label="Calcular" className="button-rounded button-warning mt-2" />
            </div>
        </div>
    </div>
  );
};

export default App;
