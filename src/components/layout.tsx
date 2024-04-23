import {ReactNode} from 'react';
import {View} from 'react-native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import React from 'react';

interface ScreenLayoutProps {
  children: ReactNode;
  backgroundColor?: string;
  safeTop?: boolean;
  safeBottom?: boolean;
  safeHorizontal?: boolean;
  flex?: number;
}

function ScreenLayout({
  children,
  backgroundColor = '#fff',
  safeBottom = true,
  safeTop = true,
  safeHorizontal = true,
  flex = 0,
}: ScreenLayoutProps) {
  const insets = useSafeAreaInsets();

  return (
    <View
      style={{
        flex,
        paddingBottom: safeBottom ? Math.max(insets.bottom, 24) : 8,
        paddingTop: safeTop ? Math.max(insets.top, 24) : 8,
        backgroundColor,
        paddingHorizontal: safeHorizontal ? 16 : 0,
      }}>
      {children}
    </View>
  );
}

export default ScreenLayout;
