import IconContainer from "./IconContainer";
import {
  ComponentColor
} from "types/enums";

function MedalIcon(props : {
  color : ComponentColor,
  className? : string
}) {
  const {
    color,
    className
  } = props;

  return (
    <IconContainer
      viewBox="0 0 64 64"
      className={ className }>
      <path
        className={ `svg-fill-${ color }` }
        d="M48.0957,25.532a2.2767,2.2767,0,0,0-1.2285-3.7842l-8.49-1.6612a.2721.2721,0,0,1-.1856-.1367l-4.2021-7.5586a2.2772,2.2772,0,0,0-3.9786,0l-4.2021,7.56a.2728.2728,0,0,1-.1885.1357l-8.4873,1.6612a2.2761,2.2761,0,0,0-1.2285,3.7832l5.8906,6.333a.272.272,0,0,1,.0713.22L20.8223,40.67a2.2779,2.2779,0,0,0,3.22,2.3388l7.84-3.6455a.274.274,0,0,1,.2344,0l7.8428,3.6455a2.2776,2.2776,0,0,0,3.2187-2.34l-1.0439-8.583a.2746.2746,0,0,1,.0723-.2227Z" />
      <path
        className={ `svg-fill-${ color }` }
        d="M15.4414,45.9353c-.0586-.0391-.1172-.0772-.1514-.0957a6.4438,6.4438,0,0,0-6.747-.0567,1,1,0,0,0-.4756.7139,6.464,6.464,0,0,0,9.7353,6.4941.9992.9992,0,0,0,.4737-.705c.02-.1241.03-.2481.039-.3721A6.4551,6.4551,0,0,0,15.4414,45.9353Z" />
      <path
        className={ `svg-fill-${ color }` }
        d="M21.99,47.2858a6.4968,6.4968,0,0,1-1.65,3.95,8.4675,8.4675,0,0,0-3.79-6.96,1.91,1.91,0,0,0-.21-.14,7.7143,7.7143,0,0,0-1.41-.7,6.4365,6.4365,0,0,1,2.87-2.26,1.0357,1.0357,0,0,1,.86.05A6.5117,6.5117,0,0,1,21.99,47.2858Z" />
      <path
        className={ `svg-fill-${ color }` }
        d="M9.2744,10.2273a1.0055,1.0055,0,0,0-.8486-.0977A5.0263,5.0263,0,0,0,7.3809,19.155a1.0018,1.0018,0,0,0,.8486.0977,5.0262,5.0262,0,0,0,1.0449-9.0254Z" />
      <path
        className={ `svg-fill-${ color }` }
        d="M8.73,42.8358a6.4258,6.4258,0,0,1-3.9-1.74,6.4907,6.4907,0,0,1-1.71-6.71,1.0059,1.0059,0,0,1,.59-.62,6.3136,6.3136,0,0,1,3.61-.3,8.8175,8.8175,0,0,0-.5,1.36,3.7834,3.7834,0,0,0-.11.4A8.5065,8.5065,0,0,0,8.73,42.8358Z" />
      <path
        className={ `svg-fill-${ color }` }
        d="M14.4355,30.9734a1.01,1.01,0,0,0-.832-.1934,6.4084,6.4084,0,0,0-4.8691,4.6211A1.6762,1.6762,0,0,0,8.67,35.63,6.4929,6.4929,0,0,0,10.7275,42l.208.1719a1.0062,1.0062,0,0,0,.625.2188,1.0188,1.0188,0,0,0,.21-.0225,6.5044,6.5044,0,0,0,4.9424-4.8486v-.001A6.4881,6.4881,0,0,0,14.4355,30.9734Z" />
      <path
        className={ `svg-fill-${ color }` }
        d="M8.9043,23.7156a1.4137,1.4137,0,0,0-.1963-.254,5.4259,5.4259,0,0,0-5.3418-1.9892.9947.9947,0,0,0-.6875.5019A5.5146,5.5146,0,0,0,7.501,30.1316a5.587,5.587,0,0,0,1.0439-.0987.9961.9961,0,0,0,.69-.497l.1172-.2188c.0107-.0185.0205-.0371.0293-.0556A5.4814,5.4814,0,0,0,8.9043,23.7156Z" />
      <path
        className={ `svg-fill-${ color }` }
        d="M14.02,24.4758a5.6067,5.6067,0,0,1-2.43,4.59,7.3866,7.3866,0,0,0-1.02-6.46,2.8723,2.8723,0,0,0-.34-.44,7.9155,7.9155,0,0,0-.89-.94,5.39,5.39,0,0,1,2.54-.69,1.0037,1.0037,0,0,1,.78.35A5.4481,5.4481,0,0,1,14.02,24.4758Z" />
      <path
        className={ `svg-fill-${ color }` }
        d="M48.5586,45.9353c.0586-.0391.1172-.0772.1514-.0957a6.4438,6.4438,0,0,1,6.747-.0567,1,1,0,0,1,.4756.7139,6.464,6.464,0,0,1-9.7353,6.4941.9992.9992,0,0,1-.4737-.705c-.02-.1241-.03-.2481-.039-.3721A6.4551,6.4551,0,0,1,48.5586,45.9353Z" />
      <path
        className={ `svg-fill-${ color }` }
        d="M42.01,47.2858a6.4968,6.4968,0,0,0,1.65,3.95,8.4675,8.4675,0,0,1,3.79-6.96,1.91,1.91,0,0,1,.21-.14,7.7143,7.7143,0,0,1,1.41-.7,6.4365,6.4365,0,0,0-2.87-2.26,1.0357,1.0357,0,0,0-.86.05A6.5117,6.5117,0,0,0,42.01,47.2858Z" />
      <path
        className={ `svg-fill-${ color }` }
        d="M54.7256,10.2273a1.0055,1.0055,0,0,1,.8486-.0977,5.0263,5.0263,0,0,1,1.0449,9.0254,1.0018,1.0018,0,0,1-.8486.0977,5.0262,5.0262,0,0,1-1.0449-9.0254Z" />
      <path
        className={ `svg-fill-${ color }` }
        d="M55.27,42.8358a6.4258,6.4258,0,0,0,3.9-1.74,6.4907,6.4907,0,0,0,1.71-6.71,1.0059,1.0059,0,0,0-.59-.62,6.3136,6.3136,0,0,0-3.61-.3,8.8175,8.8175,0,0,1,.5,1.36,3.7834,3.7834,0,0,1,.11.4A8.5065,8.5065,0,0,1,55.27,42.8358Z" />
      <path
        className={ `svg-fill-${ color }` }
        d="M49.5645,30.9734a1.01,1.01,0,0,1,.832-.1934,6.4084,6.4084,0,0,1,4.8691,4.6211,1.6762,1.6762,0,0,1,.0645.2285A6.4929,6.4929,0,0,1,53.2725,42l-.208.1719a1.0062,1.0062,0,0,1-.625.2188,1.0188,1.0188,0,0,1-.21-.0225,6.5044,6.5044,0,0,1-4.9424-4.8486v-.001A6.4881,6.4881,0,0,1,49.5645,30.9734Z" />
      <path
        className={ `svg-fill-${ color }` }
        d="M55.0957,23.7156a1.4137,1.4137,0,0,1,.1963-.254,5.4259,5.4259,0,0,1,5.3418-1.9892.9947.9947,0,0,1,.6875.5019,5.5146,5.5146,0,0,1-4.8223,8.1573,5.587,5.587,0,0,1-1.0439-.0987.9961.9961,0,0,1-.69-.497l-.1172-.2188c-.0107-.0185-.0205-.0371-.0293-.0556A5.4814,5.4814,0,0,1,55.0957,23.7156Z" />
      <path
        className={ `svg-fill-${ color }` }
        d="M49.98,24.4758a5.6067,5.6067,0,0,0,2.43,4.59,7.3866,7.3866,0,0,1,1.02-6.46,2.8723,2.8723,0,0,1,.34-.44,7.9155,7.9155,0,0,1,.89-.94,5.39,5.39,0,0,0-2.54-.69,1.0037,1.0037,0,0,0-.78.35A5.4481,5.4481,0,0,0,49.98,24.4758Z" />
    </IconContainer>
  );
}


export default MedalIcon;