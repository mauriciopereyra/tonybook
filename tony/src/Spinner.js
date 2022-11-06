import './Spinner.css'

const Spinner = (props) => {
    return (
        <div className='spinner'
        style={{display: props.loading ? 'initial' : 'none'}}
        ></div>
    )
}

export default Spinner