import dayjs from 'dayjs';
import Controls from '../presentational/Controls';

const ControlsContainer = () => {
    const startDate = new dayjs('09-27-2021');
    const endDate = dayjs('10-03-2021');

    const onPrev = () => console.log('onPrev');
    const onNext = () => console.log('onNext');
    const onToday = () => console.log('onToday');

    return (
        <Controls
            startDate={startDate}
            endDate={endDate}
            onPrev={onPrev}
            onNext={onNext}
            onToday={onToday}
        />
    );
};

export default ControlsContainer;
