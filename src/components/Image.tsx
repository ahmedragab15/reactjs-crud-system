interface Iprops {
  src: string;
  alt: string;
  className: string;
}

const Image = ({src,alt,className}: Iprops) => {
  return (
    <>
      <img className={className} src={src} alt={alt} />
    </>
  );
};

export default Image;