import json
import json

with open('data.json', 'r', encoding='utf-8') as json_file:
    data = json.load(json_file)
    cities_map = {k: data[k]["nom"] for k in data.keys()}
    with open('cities_map.json', 'w', encoding='utf-8') as cities_file: 
        json.dump(cities_map, cities_file, ensure_ascii=False)