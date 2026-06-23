export { default as proxy } from 'next-auth/middleware'
export const config = {
  matcher: ['/mahasiswa/:path*', '/admin/:path*', '/prodi/:path*', '/kajur/:path*', '/pimpinan/:path*']
}
