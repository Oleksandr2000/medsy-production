const CartIcon = ({ width = "20px", height = "20px" }) => {
  return (
    <>
      <svg className="hidden">
        <symbol viewBox="0 0 18 18" id="cart">
          <g className="dark:fill-slate-400">
            <path
              d="M4.7,3.8H17.3a.9.9,0,0,1,.9.9V17.3a.9.9,0,0,1-.9.9H4.7a.9.9,0,0,1-.9-.9V4.7A.9.9,0,0,1,4.7,3.8ZM2,4.7A2.7,2.7,0,0,1,4.7,2H17.3A2.7,2.7,0,0,1,20,4.7V17.3A2.7,2.7,0,0,1,17.3,20H4.7A2.7,2.7,0,0,1,2,17.3ZM11,11C8.515,11,6.5,8.582,6.5,5.6H8.3c0,2.309,1.5,3.6,2.7,3.6s2.7-1.291,2.7-3.6h1.8C15.5,8.582,13.485,11,11,11Z"
              transform="translate(-2 -2)"
              fillRule="evenodd"
              className="fill-black dark:fill-slate-400"
            />
          </g>
        </symbol>
      </svg>
      <svg
        width={width}
        height={height}
        strokeWidth={0.2}
        className="stroke-dark dark:stroke-slate-500"
      >
        <use xlinkHref="#cart"></use>
      </svg>
    </>
  );
};

export default CartIcon;
