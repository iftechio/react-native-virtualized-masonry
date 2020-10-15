import React, { useMemo } from "react";
import { FlatList, FlatListProps, View } from "react-native";

type MasonryProps<ItemT> = {
  width?: number;
  getBrickHeight(item: ItemT, brickWidth?: number): number;
  gutter?: number;
} & FlatListProps<ItemT>;

export default function Masonry<ItemT>({
  numColumns = 2,
  gutter = 0,
  width,
  data,
  renderItem,
  getBrickHeight,
  keyExtractor,
  ...otherProps
}: MasonryProps<ItemT>) {
  const columns = useMemo(() => Array.from({ length: numColumns }), [
    numColumns,
  ]);
  const brickData = useMemo(
    () =>
      data
        ? data.map((i) => ({
            ...i,
            height: getBrickHeight(
              i,
              width ? (width + gutter) / numColumns - gutter : undefined
            ),
          }))
        : [],
    [data, width, gutter, numColumns]
  );

  const rowData = useMemo(() => {
    const columnsHeight = columns.map(() => 0);

    return brickData.map((item, index, arr) => {
      const isLast = index === arr.length - 1;
      const currentMinHeight = Math.min(...columnsHeight);
      const columnNum = columnsHeight.indexOf(currentMinHeight);

      columnsHeight[columnNum] =
        columnsHeight[columnNum] + item.height + gutter;

      const afterMinHeight = Math.min(...columnsHeight);
      const afterMaxHeight = Math.max(...columnsHeight);
      const rowHeight =
        (isLast ? afterMaxHeight : afterMinHeight) - currentMinHeight;

      return {
        height: rowHeight,
        item,
        columnNum,
      };
    });
  }, [brickData, columns, gutter]);

  return (
    <FlatList
      {...otherProps}
      CellRendererComponent={(props) => (
        <View pointerEvents="box-none">{props.children}</View>
      )}
      data={rowData}
      renderItem={({ item, index, separators }) => (
        <View
          pointerEvents="box-none"
          style={{
            height: item.height,
            flexDirection: "row",
            marginHorizontal: gutter / -2,
            marginTop: index < numColumns ? gutter / -2 : 0,
            marginBottom: index === rowData.length - 1 ? gutter / -2 : 0,
          }}
        >
          {columns.map((val, i) => (
            <View
              key={`${index}-${i}`}
              pointerEvents="box-none"
              style={{
                flex: 1,
                padding: gutter / 2,
              }}
            >
              {i === item.columnNum && renderItem
                ? renderItem({ item: item.item, index, separators })
                : null}
            </View>
          ))}
        </View>
      )}
      getItemLayout={(d, i) =>
        d
          ? {
              length: d[i].height,
              offset: d.slice(0, i).reduce((sum, val) => sum + val.height, 0),
              index: i,
            }
          : {
              length: 0,
              offset: 0,
              index: i,
            }
      }
      keyExtractor={
        keyExtractor
          ? (item, index) => keyExtractor(item.item, index)
          : undefined
      }
      getItem={undefined}
    />
  );
}
