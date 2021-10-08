import { CLOCKER_ENTRY_TYPE } from 'constants/companyAdmin/enums';

const useTimeline = clockerEntries => {
    const timeline = [];

    let prevEntry = null;
    let currIndex = 0;
    let currBlock = { ...currBlockTemplate };
    for (const entry of clockerEntries) {
        switch (entry.type) {
            case CLOCKER_ENTRY_TYPE.WORKING:
                if (currBlock.clockIn) {
                    currBlock.clockOut = buildBlockEntry(entry, 'end');

                    // move to next block
                    timeline.push(currBlock);
                    currBlock = { ...currBlockTemplate };
                    currIndex++;
                } else {
                    currBlock.clockIn = buildBlockEntry(entry, 'start');
                    currBlock.clockOut = buildBlockEntry(entry, 'end');
                }
                break;
            case CLOCKER_ENTRY_TYPE.ON_BREAK:
                currBlock.breakIn = buildBlockEntry(entry, 'start');
                currBlock.breakOut = buildBlockEntry(entry, 'end');
                break;
            default:
                break;
        }

        prevEntry = entry;
    }

    // push final block
    if (currBlock.clockIn || currBlock.clockOut) timeline.push(currBlock);

    console.log(timeline);

    return timeline;
};

const buildBlockEntry = (entry, position) => {
    switch (position) {
        case 'start':
            return {
                timestamp: entry.startOn,
                location: entry.startLocation,
                locationUnavailableReason: entry.startLocationUnavailableReason,
            };
        case 'end':
            return {
                timestamp: entry.endOn,
                location: entry.endLocation,
                locationUnavailableReason: entry.endLocationUnavailableReason,
            };
        default:
            return {};
    }
};

const currBlockTemplate = {
    clockIn: null,
    breakIn: null,
    breakOut: null,
    clockOut: null,
};

export default useTimeline;
