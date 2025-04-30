import { ActivityIndicator, FlatList, ListRenderItem } from 'react-native';
import { H3, SizableText, YStack, YStackProps } from 'tamagui';

interface HorizontalListSectionProps<T> extends YStackProps {
  data: T[];
  renderItem: ListRenderItem<T>;
  loading: boolean;
  error: string | null;
  ListEmptyComponent: React.FC;
  keyExtractor: (item: T) => string;
  title: string;
}

export default function HorizontalListSection<T>({
  title,
  data,
  renderItem,
  ListEmptyComponent,
  keyExtractor,
  loading,
  error,
}: HorizontalListSectionProps<T>) {
  return (
    <YStack flex={1} marginBottom="$4" minHeight={280}>
      <H3 aria-label={title} mb="$4">
        {title}
      </H3>
      {loading ? (
        <ActivityIndicator size="small" style={{ alignSelf: 'center' }} />
      ) : error ? (
        <SizableText color="$red10">{`Error: ${error}`}</SizableText>
      ) : (
        <FlatList<T>
          horizontal
          data={data}
          ListEmptyComponent={ListEmptyComponent}
          renderItem={renderItem}
          keyExtractor={keyExtractor}
          showsHorizontalScrollIndicator={false}
        />
      )}
    </YStack>
  );
}
