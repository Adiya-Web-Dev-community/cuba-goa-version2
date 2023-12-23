import './Preloader-Component.css'
import { CSpinner } from "@coreui/react";

const PreLoader = () => {
    return(
        <section className='pre-loader-parent'>
            <section className='pre-loader'>
              <div>
                <span className='pre-loader-balls'>
                  <CSpinner size="sm" color="danger" variant="grow" />
                </span>
                <span className='pre-loader-balls'>
                  <CSpinner size="sm" color="warning" variant="grow" />
                </span>
                <span className='pre-loader-balls'>
                  <CSpinner size="sm" color="success" variant="grow" />
                </span>
                <span className='pre-loader-balls'>
                  <CSpinner size="sm" color="primary" variant="grow" />
                </span>
                <span className='pre-loader-balls'>
                  <CSpinner size="sm" color="info" variant="grow" />
                </span>
              </div>
            </section>
          </section>
    )
}

export default PreLoader;