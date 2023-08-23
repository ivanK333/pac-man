import pandas as pd

def read_csv_as_dataframe(file_path):
    df = pd.read_csv(file_path, header=None)
    df = df.fillna(0)
    df = df.astype(int) 
    return df.values

def read_csv_as_2d_array(file_path):
    df = pd.read_csv(file_path, header=None)
    df = df.fillna(0)
    # df = df.astype(int)  
    array_2d = df.values
    extended_array = [row + row[::-1] for row in array_2d]
    return extended_array

# Example usage

file_path = '../PacMan levels - test.csv'
values = read_csv_as_dataframe(file_path)

# print(values)
matrix = [list(row) + list(row[::-1]) for row in values]
print(matrix)
