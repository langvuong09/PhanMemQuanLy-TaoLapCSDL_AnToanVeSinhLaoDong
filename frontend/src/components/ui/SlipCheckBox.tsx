type SlipCheckBox = {
    isActive?: boolean;
    onChange?: void;
}

const SlipCheckBox: React.FC<SlipCheckBox> = ({
    isActive,
    onChange
}: SlipCheckBox) => {
    return (
        <div className="checkbox-wrapper-3">
            <input type="checkbox" id="cbx-3" onChange={() => onChange} />
            <label htmlFor="cbx-3" className={`toggle`}>
                <span></span>
            </label>
        </div>
    )
}

export default SlipCheckBox;