import ButtonContainer from 'components/shared/generic/button/containers/ButtonContainer';

const Controls = ({ startDate, endDate, onPrev, onNext, onToday }) => {
    return (
        <div className="controls">
            <div className="nav-butons">
                <button onClick={onPrev}>
                    <i class="far fa-chevron-left" />
                </button>
                <button onClick={onNext}>
                    <i class="far fa-chevron-right" />
                </button>
            </div>
            <div className="date-range">
                <p className="start-date">{startDate.format('DD MMM YYYY')}</p>
                <p>-</p>
                <p className="end-date">{endDate.add(7, 'days').format('DD MMM YYYY')}</p>
            </div>
            <ButtonContainer className="today-button" setColour="transparent" handleClick={onToday}>
                <i class="far fa-calendar-week"></i> Today
            </ButtonContainer>
        </div>
    );
};

export default Controls;
