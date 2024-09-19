import React from 'react';
import layoutGraficos from './image/layoutGraficos1.jpg';
import icon_Moda_da_casa from './image/icon_moda_da_casa.png';
import icon_de_bem_com_a_vida from './image/icon_de_bem_com_a_vida.png';
import icon_grill from './image/icon_grill.png';
import icon_receita_do_chefe from './image/icon_receita_do_chefe.png';

import { UserData } from '../Data';

function LayoutGraphic() {
  const rectStyle = {
    position: 'absolute',
  };

  const locationMap = {
    'Oeste Superior Direita': 'Oeste_Superior_Direita',
    'Oeste Superior Esquerda': 'Oeste_Superior_Esquerda',
    'Oeste Inferior Direita': 'Oeste_Inferior_Direita',
    'Oeste Inferior Esquerda': 'Oeste_Inferior_Esquerda',
    'Norte Esquerda': 'Norte_Esquerda',
    'Norte Direita': 'Norte_Direita',
    'Norte Esquerda_': 'Norte_Esquerda_',
    'Norte Direita_': 'Norte_Direita_',
    'Leste Superior Esquerda': 'Leste_Superior_Esquerda',
    'Leste Superior Direita': 'Leste_Superior_Direita',
    'Leste Inferior Esquerda': 'Leste_Inferior_Esquerda',
    'Leste Inferior Direita': 'Leste_Inferior_Direito',
    'Norte Superior Direita': 'Norte_Superior_Direita',
    'Norte Superior Esquerda': 'Norte_Superior_Esquerda',
  };

  const getColorForLocation = (location) => {
    const filteredData = UserData.filter(
      (item) => item.fila.localizacao === location
    );

    if (filteredData.length > 0) {
      const lastItem = filteredData[filteredData.length - 1];
      switch (lastItem.situacao) {
        case 'verde':
          return 'rgba(0, 255, 0, 0.5)';
        case 'amarelo':
          return 'rgba(255, 255, 0, 0.5)';
        case 'vermelho':
          return 'rgba(255, 0, 0, 0.5)';
        default:
          return 'rgba(0, 0, 0, 0.5)'; // Cor padrão caso não haja correspondência
      }
    }
    return 'rgba(0, 0, 0, 0.5)'; // Cor padrão caso não haja dados para a localização
  };

  return (
    <div style={{ position: 'relative', display: 'inline-block' , width: '4x10%'}}>
      <img
        src={layoutGraficos}
        alt="Layout do Restaurante"
        style={{ width: '50%', height: 'auto' }}
      />
      <div className='Oeste_Superior'>
      <img
        src={icon_Moda_da_casa}
        alt="icon_Moda_da_casa"
        style={{
          ...rectStyle, 
          top: '30.7%',  
          left: '11.5%', 
          width: '2.5%', 
          height: 'auto', 
        }}
      />
      </div>
      <div className='Oeste_Superior_Direita'
        style={{
          ...rectStyle,
          backgroundColor: getColorForLocation('Oeste Superior Direita'), 
          top: '29.8%',  
          left: '2.6%', 
          width: '8.5%', 
          height: '4.4%', 
        }}
      />
      <div className='Oeste_Superior_Esquerda'
        style={{
          ...rectStyle,
          backgroundColor: getColorForLocation('Oeste Superior Esquerda'), 
          top: '36.1%',  
          left: '2.6%', 
          width: '8.5%', 
          height: '4.4%', 
        }}
      />
      <div className='Oeste_Inferior'>
      <img
        src={icon_Moda_da_casa}
        alt="icon_Moda_da_casa"
        style={{
          ...rectStyle, 
          top: '56%',  
          left: '11.5%', 
          width: '2.5%', 
          height: 'auto', 
        }}
      />
      </div>
      <div className='Oeste_Inferior_Direita'
        style={{
          ...rectStyle,
          backgroundColor: getColorForLocation('Oeste Inferior Direita'), 
          top: '54.8%',  
          left: '2.6%', 
          width: '8.5%', 
          height: '4.4%', 
        }}
      />
      <div className='Oeste_Inferior_Esquerda'
        style={{
          ...rectStyle,
          backgroundColor: getColorForLocation('Oeste Inferior Esquerda'), 
          top: '61%',  
          left: '2.6%', 
          width: '8.5%', 
          height: '4.4%', 
        }}
      />
       <div className='Norte'>
      <img
        src={icon_Moda_da_casa}
        alt="icon_Moda_da_casa"
        style={{
          ...rectStyle, 
          top: '71%',  
          left: '18.2%', 
          width: '2.5%', 
          height: 'auto', 
        }}
      />
      </div>
      <div className='Norte_Esquerda'
        style={{
          ...rectStyle,
          backgroundColor: getColorForLocation('Norte Esquerda'), 
          top: '38.5%',  
          left: '17.8%', 
          width: '1.4%', 
          height: '31%', 
        }}
      />
      <div className='Norte_Direita'
        style={{
          ...rectStyle,
          backgroundColor: getColorForLocation('Norte Direita'), 
          top: '38.5%',  
          left: '19.8%', 
          width: '1.4%', 
          height: '31%', 
        }}
      />
      <div className='Norte_'>
      <img
        src={icon_de_bem_com_a_vida}
        alt="icon_de_bem_com_a_vida"
        style={{
          ...rectStyle, 
          top: '71%',  
          left: '29.4%', 
          width: '2.5%', 
          height: 'auto', 
        }}
      />
      </div>
      <div className='Norte_Esquerda_'
        style={{
          ...rectStyle,
          backgroundColor: getColorForLocation('Norte Esquerda_'), 
          top: '38.5%',  
          left: '29%', 
          width: '1.4%', 
          height: '31%', 
        }}
      />
      <div className='Norte_Direita_'
        style={{
          ...rectStyle,
          backgroundColor: getColorForLocation('Norte Direita_'), 
          top: '38.5%',  
          left: '30.8%', 
          width: '1.4%', 
          height: '31%', 
        }}
      />
      <div className='Leste_Superior'>
      <img
        src={icon_grill}
        alt="icon_icon_grill"
        style={{
          ...rectStyle, 
          top: '31%',  
          left: '46.7%', 
          width: '2.5%', 
          height: 'auto', 
        }}
      />
      </div>
      <div className='Leste_Superior_Esquerda'
        style={{
          ...rectStyle,
          backgroundColor: getColorForLocation('Leste Superior Esquerda'), 
          top: '30%',  
          left: '38%', 
          width: '8.5%', 
          height: '4.4%',
        }}
      />
      <div className='Leste_Superior_Direita'
        style={{
          ...rectStyle,
          backgroundColor: getColorForLocation('Leste Superior Direita'), 
          top: '36.1%',  
          left: '38%', 
          width: '8.5%', 
          height: '4.4%',
        }}
      />
      <div className='Leste_Inferior'>
      <img
        src={icon_receita_do_chefe}
        alt="icon_receita_do_chefe"
        style={{
          ...rectStyle, 
          top: '56%',  
          left: '36.3%', 
          width: '2.5%', 
          height: 'auto', 
        }}
      />
      </div>
      <div className='Leste_Inferior_Esquerda'
        style={{
          ...rectStyle,
          backgroundColor: getColorForLocation('Leste Inferior Esquerda'), 
          top: '55%',  
          left: '39%', 
          width: '8.5%', 
          height: '4.4%',
        }}
      />
      <div className='Leste_Inferior_Direito'
        style={{
          ...rectStyle,
          backgroundColor: getColorForLocation('Leste Inferior Direita'), 
          top: '61%',  
          left: '39%', 
          width: '8.5%', 
          height: '4.4%',
        }}
      />
      <div className='Norte_Superior'>
      <img
        src={icon_grill}
        alt="icon_grill"
        style={{
          ...rectStyle, 
          top: '6.5%',  
          left: '30%', 
          width: '2.5%', 
          height: 'auto', 
        }}
      />
      </div>
      <div className='Norte_Superior_Direita'
        style={{
          ...rectStyle,
          backgroundColor: getColorForLocation('Norte Superior Direita'), 
          top: '11.8%',  
          left: '20.5%', 
          width: '9.1%', 
          height: '4.4%',
        }}
      />
      <div className='Norte_Superior_Esquerda'
        style={{
          ...rectStyle,
          backgroundColor: getColorForLocation('Norte Superior Esquerda'), 
          top: '6%',  
          left: '20.5%', 
          width: '9.1%', 
          height: '4.4%',
        }}
      />
    </div>
  );
}

export default LayoutGraphic;
