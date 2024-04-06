import React from 'react'
import Header from './Header'
import Footer from './Footer'
function Layout({children}) {
  return (
    <div>
        <Header/>
        <div style={{height:'100%',minHeight:"100vh"}}>
        {children}
      </div>

        <Footer style={{height:'100%'}}/>
    </div>
  )
}

export default Layout;