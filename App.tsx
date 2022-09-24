import { A, Footer, H1, H3, Main } from '@expo/html-elements';
import { StatusBar } from 'expo-status-bar';
import React, { useRef } from 'react';
import { StyleSheet, Platform, View } from 'react-native';
import { LogBoxLog } from './LogBox/Data/LogBoxLog';
// import { useHover } from 'react-native-web-hooks';

// >


// import { parseLogBoxException } from 'react-native/Libraries/LogBox/Data/parseLogBoxLog';
// import { LogBoxLog } from 'react-native/Libraries/LogBox/Data/LogBoxLog';
// import { parseLogBoxException } from './LogBox/Data/parseLogBoxLog';
// import { parseException } from './modules/ExceptionsManager/index';

// function symbolicateAsync(error) {
//   return new Promise((resolve, reject) => {

//     const metroError = new LogBoxLog(parseLogBoxException(parseException(error, false)));
//     if (metroError) {
//       console.log("metroError", metroError);
//       metroError.symbolicate(() => {
//         resolve(metroError);
//       })
//     } else {
//       reject(new Error('Could not symbolicate error with Metro'));
//     }
//   });
// }

// function useSymbolicatedMetroError(error: Error) {
//   // return error;
//   const [results, setResults] = React.useState(null);
//   const isMounted = React.useRef(true);

//   React.useEffect(() => {
//     symbolicateAsync(error).then((results) => {
//       if (isMounted.current) {
//         setResults(results);
//       }
//     }
//     ).catch((e) => {
//       console.error(e);
//     }
//     );
//     return () => {
//       isMounted.current = false;
//     }
//   }, [error]);

//   return results;
// }


function Fourth() {
  // throw new Error('hey');

  return null;
}
function Third() {
  return <Fourth />
}
function Second() {
  return <Third />
}

export default function App() {
  const ref = useRef(null)
  // const err = useSymbolicatedMetroError(new Error('hey'));


  // console.error('hey')
  // console.log('go:', err)
  // const hover = useHover(ref)
  // console.error('hey :)')
  return (
    <View style={styles.container}>
      <Second />
      <Main style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <H1 onPress={() => {
          throw new Error('A really long error has now just been thrown')
        }} style={{
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
          // opacity: hover ? 0.5 : 1,
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
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
