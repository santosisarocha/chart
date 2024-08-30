import layoutGraficos from './image/layoutGraficos1.jpg';

function LayoutGraphic() {
  return (
    <img
      src={layoutGraficos}
      alt='Layout do Restaurante'
      style={{ width: '30%', height: 'auto' }} 
    />
  );
}

export default LayoutGraphic;
