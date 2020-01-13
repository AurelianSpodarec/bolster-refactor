import React from 'react';
import ButtonContainer from 'components/shared/generic/button/containers/ButtonContainer';

const PageSelector = ({ page = 1, maxPage = 1, setPage }) => {
    const isEmpty = maxPage === 0;
    return (
        <div
            style={{
                display: 'flex',
                flexDirection: 'row',
                alignItems: 'center',
                justifyItems: 'center',
                float: 'right',
            }}
        >
            {page > 2 && (
                <ButtonContainer className="icon-only" handleClick={skipPagesBack}>
                    <i className="far fa-chevron-left" />
                    <i className="far fa-chevron-left" />
                </ButtonContainer>
            )}
            {page > 1 && (
                <ButtonContainer className="icon-only" handleClick={() => setPage(page - 1)}>
                    <i className="far fa-chevron-left" />
                </ButtonContainer>
            )}
            <p style={{ margin: '0 1em' }}>
                Page {isEmpty ? 0 : page} of {maxPage} {!!isEmpty && '(empty)'}
            </p>
            {page < maxPage && (
                <ButtonContainer className="icon-only" handleClick={() => setPage(page + 1)}>
                    <i className="far fa-chevron-right" />
                </ButtonContainer>
            )}
            {page < maxPage - 1 && (
                <ButtonContainer className="icon-only" handleClick={skipPagesForward}>
                    <i className="far fa-chevron-right" />
                    <i className="far fa-chevron-right" />
                </ButtonContainer>
            )}
        </div>
    );

    function skipPagesBack() {
        if (page - 10 <= 1) {
            setPage(1);
        } else {
            setPage(page - 10);
        }
    }
    function skipPagesForward() {
        if (page + 10 >= maxPage) {
            setPage(maxPage);
        } else {
            setPage(page + 10);
        }
    }
};

export default PageSelector;
