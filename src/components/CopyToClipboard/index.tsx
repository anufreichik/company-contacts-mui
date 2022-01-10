import React, { useCallback, useState } from "react";
import Box from "@mui/material/Box";
import PropTypes from "prop-types";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import { styled } from "@mui/material/styles";
import { useCopyToClipboard } from "react-use";
import Tooltip from "@mui/material/Tooltip";
import { ClickAwayListener } from "@mui/material";
interface IProps {
  text: string;
}
const STATUS_COPY={
    COPY:'copy',
    COPIED:'copied'
}

const TITLE_BY_STATUS={
    [STATUS_COPY.COPY]:'Copy',
    [STATUS_COPY.COPIED]:'Copied'
}
const StyledContentCopyIcon = styled(ContentCopyIcon)(({ theme }) => ({
  marginRight: theme.spacing(1),
}));
const StyledBox = styled(Box)(({ theme }) => ({
  cursor: "pointer",
}));

export const CopyToClipboard: React.FC<IProps> = ({ text }) => {
  const [state, copyToClipboard] = useCopyToClipboard();
  const [status, setStatus] = useState(STATUS_COPY.COPY);

  const onClickCopy = useCallback(() => {
    copyToClipboard(text);
    setStatus(STATUS_COPY.COPIED);
  }, [copyToClipboard, text]);

  const resetStatus = useCallback(() => {
    setStatus(STATUS_COPY.COPY);
  }, [setStatus]);

  return (
    <ClickAwayListener onClickAway={resetStatus}>
      <Tooltip title={TITLE_BY_STATUS[status]}>
        <StyledBox
          display="flex"
          alignItems="center"
          onClick={onClickCopy}
          onMouseLeave={resetStatus}
        >
          <StyledContentCopyIcon fontSize="small" />
          {text}
        </StyledBox>
      </Tooltip>
    </ClickAwayListener>
  );
};

CopyToClipboard.propTypes = {
  text: PropTypes.string.isRequired,
};
