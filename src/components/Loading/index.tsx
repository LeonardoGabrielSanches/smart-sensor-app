import { Center, Heading, Spinner } from "native-base";

export function Loading() {
    return (
        <Center height="full">
            <Spinner accessibilityLabel="Carregando aplicativo" size="lg" />
            <Heading color="primary.500" fontSize="md">
                Carregando
            </Heading>
        </Center>
    );
};