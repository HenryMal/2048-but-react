import { Stack, styled, Typography } from "@mui/material";
import {
  OVERLAY_FADE_IN_ANIMATION_KEYFRAME,
  OVERLAY_FADE_IN_DELAY,
  OVERLAY_FADE_IN_SPEED,
} from "./OverlayUtilities";
import { ReactNode } from "react";

const OverlayContainer = styled(Stack)<{ color: string }>(({ color }) => {
  const animation: string = `${OVERLAY_FADE_IN_ANIMATION_KEYFRAME} ${OVERLAY_FADE_IN_SPEED} ease ${OVERLAY_FADE_IN_DELAY} both`;
  return {
    position: "absolute",
    zIndex: 2,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    width: "500px",
    height: "500px",
    backgroundColor: color,
    animation,
  };
});

export type OverlayProps = {
  backgroundColor: string;
  textColor: string;
  overlayText: string;
  children: ReactNode;
};

const Overlay = ({
  backgroundColor,
  textColor,
  overlayText,
  children,
}: OverlayProps) => {
  return (
    <OverlayContainer color={backgroundColor} spacing={3}>
      <Typography fontSize="60px" fontWeight="bold" color={textColor}>
        {overlayText}
      </Typography>

      <Stack direction="row" spacing={3}>
        {children}
      </Stack>
    </OverlayContainer>
  );
};

export default Overlay;
