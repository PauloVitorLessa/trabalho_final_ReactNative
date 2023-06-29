import "react-native-gesture-handler";
import { DataProvider } from "./src/context/DataContext";
import { EditoraProvider } from "./src/context/EditoraContext";
import { LivroProvider } from "./src/context/LivroContext";
import { PaperProvider } from "react-native-paper";
import Routes from "./src/routes";

export default function App() {
  return (
    <PaperProvider>
      <DataProvider>
        <EditoraProvider>
          <LivroProvider>
            <Routes />
          </LivroProvider>
        </EditoraProvider>
      </DataProvider>
    </PaperProvider>
  );
}
