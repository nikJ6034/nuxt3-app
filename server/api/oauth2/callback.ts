import { useBody, useCookies, useQuery, setCookie } from 'h3'

export default (req, res) => {
  const {accessToken, refreshToken} = useQuery(req);
  
  const accessToken2 = accessToken as string;
  const refreshToken2 = refreshToken as string;

  setCookie(res, 'accessToken', accessToken2, { path: '/' })
  setCookie(res, 'refreshToken', refreshToken2, { path: '/' })

  res.writeHead(301, {
      location:"/"
  });
  res.end()
}