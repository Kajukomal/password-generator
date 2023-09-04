const Checkbox = ({ title,checked, onChange }) => {
    return (
        <div>
            <input type="checkbox"
              onChange={onChange} checked={checked} />
            <label>{title}</label>
          </div> 
    )
}

export default Checkbox;