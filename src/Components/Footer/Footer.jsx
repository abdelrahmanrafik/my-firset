import "./Footer.css"

const Footer = () => {
  return (
      <>
          <div className="footer mt-4">
              <div className="container-fluid">
                  <div className="row pb-3">
                      <div className="col">
                          <div>
                              <h1 className="text-white text-center pb-3 pt-2">FreshCart</h1>
                          </div>
                          <div className="allFooter">
                                <div className="gap-2 paymentIcons">
                                    <div>
                                        <h5 className="text-white">Payment Partners:</h5>
                                    </div>
                                    <div className="text-white">
                                        <i className="fa-brands fa-google-pay fa-2x icons"></i>
                                        <i className="fa-brands fa-apple-pay fa-2x icons"></i>
                                        <i className="fa-brands fa-cc-visa fa-2x icons"></i>
                                        <i className="fa-brands fa-cc-mastercard fa-2x icons"></i>
                                        <i className="fa-brands fa-amazon-pay fa-2x icons"></i>
                                    </div>
                                </div>
                                <div className="text-white d-flex flex-row justify-content-center align-items-center gap-2">
                                  <div>
                                      <h5>Get Us:</h5>
                                  </div>
                                  <div >
                                      <i className="fa-brands fa-app-store fa-2x icons"></i>
                                      <i className="fa-brands fa-google-play fa-2x icons"></i>
                                  </div>
                                </div>
                          </div>
                      </div>
                  </div>
              </div>
        </div>
      </>
  )
}

export default Footer