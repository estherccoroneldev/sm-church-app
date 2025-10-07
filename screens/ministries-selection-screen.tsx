import { FontAwesome } from '@expo/vector-icons';
import useMinistries from 'hooks/use-ministries';
import React, { useState } from 'react';
import { FlatList, ListRenderItem } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { assignUserToMultipleMinistries } from 'services/assign-user-to-ministries';
import { useAuth } from 'store/auth-store';
import { Separator, SizableText, Spinner, useTheme, XStack } from 'tamagui';
import { PrimaryButton } from 'tamagui.config';
import { Ministry } from '../@types/ministry';

function keyExtractor<T extends { id: string }>(item: T) {
  return item.id.toString();
}

const MinistriesSelectionScreen: React.FC = () => {
  const theme = useTheme();
  const user = useAuth((state) => state.user);
  const signIn = useAuth((state) => state.signIn);
  const { ministries, loading } = useMinistries();
  const [selectedList, setSelectedList] = React.useState<Ministry['id'][]>([]);
  const [loadingSelection, setLoading] = useState(false);

  const handleSelectItem = (itemId: Ministry['id']) => {
    const isSelected = selectedList.some((ministryId) => ministryId === itemId);
    if (isSelected) {
      setSelectedList(selectedList.filter((ministryId) => ministryId !== itemId));
    } else {
      setSelectedList([...selectedList, itemId]);
    }
  };

  const renderMinistryItem: ListRenderItem<Ministry> = ({ item }) => (
    <XStack
      px="$4"
      py="$6"
      onPress={() => handleSelectItem(item.id)}
      justifyContent="space-between">
      <SizableText fontSize="$6">{item.name}</SizableText>
      {selectedList.some((ministryId) => ministryId === item.id) ? (
        <FontAwesome name={'check'} size={18} color="#5EA1CA" />
      ) : null}
    </XStack>
  );

  const renderEmptyComponent = () =>
    loading ? (
      <Spinner size="large" color={'#076CB5'} />
    ) : (
      <SizableText size={'$6'} alignSelf="center">
        No ministries.
      </SizableText>
    );

  const handleSubmit = async () => {
    setLoading(true);
    const result = await assignUserToMultipleMinistries(user?.id || '', selectedList);

    if (result.success) {
      console.info('Ministries assigned successfully');
      signIn({
        ...user!,
        hasSelectedMinistries: 'yes',
      });
    } else {
      console.info('Error', result.error);
      signIn({
        ...user!,
        hasSelectedMinistries: 'no',
      });
    }
    setLoading(false);
  };

  const listFooterComponent = () => {
    return (
      <PrimaryButton
        onPress={() => handleSubmit()}
        disabled={loading || loadingSelection || selectedList.length === 0}
        icon={
          loading || loadingSelection ? <Spinner size="small" color="$background" /> : undefined
        }
        mt={'$6'}
        mb={'$4'}
        backgroundColor={theme.primary.get() as string}
        size={'$5'}>
        Guardar
      </PrimaryButton>
    );
  };

  return (
    <SafeAreaView
      style={{
        flex: 1,
        backgroundColor: theme.background.get() as string,
      }}>
      <FlatList<Ministry>
        style={{
          flex: 1,
        }}
        contentContainerStyle={{
          paddingBottom: 24,
          paddingHorizontal: 24,
          marginTop: 24,
        }}
        ListHeaderComponent={() => (
          <>
            <SizableText fontSize="$6" marginBottom="$2" mt="$2">
              Gracias por ser un miembro activo de nuestra iglesia!
            </SizableText>
            <SizableText fontSize="$6" marginBottom="$2" mt="$2">
              Por favor, seleccione los ministerios en los que está involucrado:
            </SizableText>
          </>
        )}
        ListEmptyComponent={renderEmptyComponent}
        data={ministries}
        renderItem={renderMinistryItem}
        keyExtractor={keyExtractor}
        showsVerticalScrollIndicator
        ItemSeparatorComponent={() => <Separator my="$2" vertical={false} />}
        ListFooterComponent={listFooterComponent}
      />
    </SafeAreaView>
  );
};

export default MinistriesSelectionScreen;
