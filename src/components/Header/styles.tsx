import styled from '@emotion/styled';
import { AppBar, Drawer } from '@mui/material';

export const StyledAppbar = styled(AppBar)`
  background: #fff;
  height: 84px;
  justify-content: center;
`;

export const Title = styled.p`
  font-style: normal;
  font-weight: 600;
  font-size: 14px;
  color: #4b566b;
  margin: 0;
  padding: 0 8px;
`;

export const StyledDrawer = styled(Drawer)`
  z-index: 1700;
  .MuiDrawer-paper {
    min-width: 240px;
    padding: 16px;
  }
`;
