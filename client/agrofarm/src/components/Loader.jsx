import "../styles/components/loader.css";

const Loader = ({ size = "50px", color = "#3498db" }) => {
  return (
    <div className="lds-ring" style={{ width: size, height: size }}>
      <div style={{ borderColor: `${color} transparent transparent transparent` }}></div>
      <div style={{ borderColor: `${color} transparent transparent transparent` }}></div>
      <div style={{ borderColor: `${color} transparent transparent transparent` }}></div>
      <div style={{ borderColor: `${color} transparent transparent transparent` }}></div>
    </div>
  );
};

export default Loader;
