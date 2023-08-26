import React, { useState, useEffect } from 'react';
import styled from '@emotion/native';
import { View, Text, Pressable, Image } from 'react-native';

export const Divider = styled.View`
  border-bottom-width: 1px;/
  border-bottom-color: ${(p) => p.theme.palette.gray01};
`;
