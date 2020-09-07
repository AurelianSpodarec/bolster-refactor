export const imageToOutput = currentState => {
    const filteredState = Object.entries(currentState).reduce((result, [key, value]) => {
        return value ? [...result, key] : result;
    }, []);

    console.log(filteredState);

    // switch(currentState) {
    //     case
    // }
};
