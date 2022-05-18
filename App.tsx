import { A, Footer, H1, H3, Main } from '@expo/html-elements';
import { StatusBar } from 'expo-status-bar';
import { useRef } from 'react';
import { StyleSheet, Platform, View } from 'react-native';
import { useHover } from 'react-native-web-hooks';

// >

export default function App() {
  const ref = useRef(null)
  const hover = useHover(ref)
  console.warn('hey :)')
  return (
    <View style={styles.container}>
      <Main style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <H1 style={{
          fontSize: 50,
          fontWeight: 'bold',
          textAlign: 'center',
          ...Platform.select({
            web: {
              backgroundClip: 'text',
              WebkitBackgroundClip: 'text',
              textFillColor: 'transparent',
              color: 'transparent',
              backgroundClip: 'text',
              backgroundImage: 'linear-gradient(90deg,#7928CA,#FF0080)'
            },
            default: {
              color: '#FF0080'
            }
          })
        }}>{`Expo ${Platform.OS} + Metro`}

        </H1>
        <A ref={ref} style={{

          fontSize: 24,
          fontWeight: 'bold',
          color: '#fff',
          opacity: hover ? 0.5 : 1,
          ...Platform.select({
            web: {
              transitionDuration: '500ms',
            },
            default: {

            }
          })

        }} target="_blank" href="https://github.com/EvanBacon/Metro-web-demo">View Source</A>
      </Main>
      <Footer>
        <H3 style={{
          fontSize: 18,
          fontWeight: '200',
          color: '#b7b8bf',
        }} >('Inspect Element > Sources' to see bundle results)</H3>
      </Footer>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#000",
    alignItems: "center",
    justifyContent: "center",
  },
});
