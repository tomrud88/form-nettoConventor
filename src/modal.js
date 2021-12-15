import React from 'react'
import './modal.css'

const Modal = props => {
    const modalClass = props.message ==='Congratulations! You have send the form.' ? 'modal' : 'modalError'
    return (
        <div>
        <div className='backdrop' onClick={props.onConfirm} >
        <div className={modalClass}> 
            <div className='content'>
                <p>{props.message}</p>
            </div>
            <footer>
                <button className='closeButton' onClick={props.onConfirm}>close</button>
            </footer>
        </div>
        </div>
        </div>
    )
}

export default Modal
