import React from 'react';
import { View, StyleSheet, StatusBar, StyleProp, ViewStyle, ScrollView } from 'react-native';
import { SafeAreaView, Edge } from 'react-native-safe-area-context';
import { colors } from '../../constants/colors';

interface ScreenProps {
  children: React.ReactNode;
  style?: StyleProp<ViewStyle>;
  contentContainerStyle?: StyleProp<ViewStyle>;
  scrollable?: boolean;
  edges?: Edge[];
  backgroundColor?: string;
  statusBarStyle?: 'light-content' | 'dark-content';
}

export const Screen: React.FC<ScreenProps> = ({
  children,
  style,
  contentContainerStyle,
  scrollable = false,
  edges = ['top', 'left', 'right'],
  backgroundColor = colors.background,
  statusBarStyle = 'dark-content',
}) => {
  return (
    <SafeAreaView
      edges={edges}
      style={[styles.container, { backgroundColor }, style as any]}
    >
      <StatusBar barStyle={statusBarStyle} backgroundColor={backgroundColor} />
      {scrollable ? (
        <ScrollView
          style={styles.scrollView}
          contentContainerStyle={[styles.contentContainer, contentContainerStyle]}
          showsVerticalScrollIndicator={false}
          keyboardShouldPersistTaps="handled"
        >
          {children}
        </ScrollView>
      ) : (
        <View style={[styles.inner, contentContainerStyle]}>{children}</View>
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollView: {
    flex: 1,
  },
  contentContainer: {
    flexGrow: 1,
  },
  inner: {
    flex: 1,
  },
});
