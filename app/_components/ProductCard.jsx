const ProductCard = (props) => {
  return (
    <div className="flex min-h-10 min-w-10 flex row items-center justify-between p-6">
      <h1>{props.productName}</h1>
      <div>
        <p>{props.price}</p>
        <p>{props.rating}</p>
      </div>
      <p>{props.discount}</p>
    </div>
  );
};

export default ProductCard;
