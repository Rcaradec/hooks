import "./FoundCity.scss";

type Props = {
  city?: string;
  temperature?: number;
  description?: string;
};
const FoundCity = ({ city, temperature, description }: Props) => {
  return (
    <div className='foundCity__container'>
      <h2>{city}</h2>
      <p>{temperature}</p>
      <p>{description}</p>
    </div>
  );
};

export default FoundCity;
