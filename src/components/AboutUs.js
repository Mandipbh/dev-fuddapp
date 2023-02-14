import {Platform, ScrollView, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {scale, theme} from '../utils';
import {Label, Title} from './Label';

const AboutUs = () => {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Title title="CHI SIAMO" style={{marginTop: scale(25)}} />
      </View>
      <View style={styles.subConrtainer}>
        <ScrollView showsVerticalScrollIndicator={false}>
          <Label
            style={styles.lbl}
            title="Il delivery è al centro di tutte le attività di Fuddapp, la missione è riuscire a portare i migliori ristoratori di Palermo a casa vostra, offrendovi un servizio efficiente, puntuale e performante."
          />
          <Label
            title="Fuddapp è accessibile dal sito www.fuddapp.it e dalle app IOS e Android che potrete scaricare facilmente su tutti gli store."
            style={[styles.lbl, {marginTop: scale(15)}]}
          />
          <Label
            title="Siamo orgogliosi della nostra tecnologia che con il nostro algoritmo “A.n.c.i.o.” si basa, a lungo termine sullo studio delle abitudini del cliente, per consigliare con sempre maggiore facilità, cosa ordinare sulla nostra piattaforma."
            style={[styles.lbl, {marginTop: scale(15)}]}
          />
          <Label
            title="Fuddapp è formazione! Vogliamo che la nostra immagine sia associata ad alta affidabilità e competenza, per cui aggiorniamo di continuo i nostri riders, per aumentare il grado di professionalità che vogliamo ci contraddistingua."
            style={[styles.lbl, {marginTop: scale(15)}]}
          />
          <Title title="Come funziona" style={{marginTop: scale(20)}} />
          <Label
            title={`Su FUDDAPP puoi scegliere tra tantissime attività di ristorazione e altro. Quando apri il sito o l’app, puoi scorrere l'elenco in cerca del tuo ristorante preferito, oppure cercare un nominativo specifico o un tipo di piatto a cui sei particolarmente legato. Una volta trovato quello che ti piace, aggiungilo al carrello e completa l’ordine.'`}
            style={[styles.lbl, {marginTop: scale(15)}]}
          />
          <Label
            title={`Al momento della conferma dell'ordine, potrai inserire il tuo indirizzo e/o registrarti cosi non dovrai reinserirlo dopo (anche se non sei obbligato a farlo), selezionare la fascia oraria di consegna desiderata, visualizzare il totale dell'ordine comprensivo di imposte e costo di consegna e, se tutto corretto, inviare l'ordine. Potrai decidere se pagare alla consegna o con carta di credito.`}
            style={[styles.lbl, {marginTop: scale(15)}]}
          />
          <Label
            title="Fuddapp è accessibile dal sito www.fuddapp.it e dalle app IOS e Android che potrete scaricare facilmente su tutti gli store."
            style={[styles.lbl, {marginTop: scale(15)}]}
          />
          <Label
            title="Su fuddapp potrai inoltre usufruire di codici promozionali e avrai una assistenza dedicata per tutte le problematiche relative il tuo ordine."
            style={[styles.lbl, {marginTop: scale(15)}]}
          />
        </ScrollView>
      </View>
    </View>
  );
};

export default AboutUs;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.white,
  },
  header: {
    height: Platform.OS === 'android' ? scale(50) : scale(75),
    backgroundColor: theme.colors.primary,
    justifyContent: 'center',
    alignItems: 'center',
  },
  subConrtainer: {
    padding: scale(10),
    height: '80%',
  },
  lbl: {
    color: theme.colors.gray,
    fontSize: scale(14),
  },
});
