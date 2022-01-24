import { CLOCKER_ENTRY_TYPE } from 'constants/companyAdmin/enums';

// todo refactor this to not incorrectly be named like a hook
const useTimeline = clockerEntries => {
    const timeline = [];

    let currBlock = { ...currBlockTemplate };
    for (const i in clockerEntries) {
        const entry = clockerEntries[i];
        const nextEntry = clockerEntries[parseInt(i) + 1];

        switch (entry.type) {
            case CLOCKER_ENTRY_TYPE.WORKING:
                if (currBlock.clockIn) {
                    currBlock.clockOut = buildBlockEntry(entry, 'end');

                    // move to next block
                    timeline.push({ ...currBlock });
                    currBlock = { ...currBlockTemplate };
                } else {
                    currBlock.clockIn = buildBlockEntry(entry, 'start');
                    currBlock.clockOut = buildBlockEntry(entry, 'end');

                    if (nextEntry?.type === CLOCKER_ENTRY_TYPE.WORKING) {
                        timeline.push({ ...currBlock });
                        currBlock = { ...currBlockTemplate };
                    }
                }
                break;
            case CLOCKER_ENTRY_TYPE.ON_BREAK:
                currBlock.breakIn = buildBlockEntry(entry, 'start');
                currBlock.breakOut = buildBlockEntry(entry, 'end');
                break;
            default:
                break;
        }
    }

    // push final block
    if (currBlock.clockIn || currBlock.clockOut) timeline.push(currBlock);

    return timeline;
};

const buildBlockEntry = (entry, position) => {
    switch (position) {
        case 'start':
            return {
                timestamp: entry.startOn,
                location: entry.startLocation,
                locationUnavailableReason: entry.startLocationUnavailableReason,
                jobReference: entry.jobReference,
            };
        case 'end':
            return {
                timestamp: entry.endOn,
                location: entry.endLocation,
                locationUnavailableReason: entry.endLocationUnavailableReason,
                jobReference: entry.jobReference,
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
