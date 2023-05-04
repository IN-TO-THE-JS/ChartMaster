const ds_line3 = { 
  ds1: {
    data: [[1,1], [12,10], [24,16], [32, 20], [40, 30], [50, 40], [55, 50], [65, 63], [73, 70], [78, 84], [83, 96], [89, 108], [100, 110]],
    color: "#CC0000"
  },
  ds2: {
    data: [[1,1], [12,20], [24,36], [32, 50], [40, 70], [50, 100], [55, 106], [65, 123], [73, 130], [78, 134], [83, 136], [89, 138], [100, 140]],
    color: "#00C"
  },
  ds3: {
    data: [[1,1], [12,22], [24,46], [32, 60], [40, 80], [50, 120], [55, 90], [65, 100], [73, 110], [78, 120], [83, 116], [89, 128], [100, 100]],
    color: "#000000"
  },
  ds4: {
    data: [[1,1], [12,2], [24,4], [32, 5], [40, 14], [50, 24], [55, 25], [65, 36], [73, 57], [78, 68], [83, 87], [89, 79], [100, 88]],
    color: "#0C0"
  }
}

const ds_treemap = {
  children: [
    {
      name: "boss1",
      children: [
        {name: "mister_a",group: "A",value: 40,colname: "level3",},
        {name: "mister_b",group: "A",value: 30,colname: "level3",},
        {name: "mister_c",group: "C",value: 10,colname: "level3",},
        {name: "mister_d",group: "C",value: 20,colname: "level3",},
      ],
      colname: "level2",
    },
    {
      name: "boss2",
      children: [
        {name: "mister_e",group: "C",value: 20,colname: "level3",},
        {name: "mister_f",group: "A",value: 11,colname: "level3",},
        {name: "mister_g",group: "B",value: 15,colname: "level3",},
        {name: "mister_h",group: "B",value: 16,colname: "level3",},
      ],
      colname: "level2",
    },
    {
      name: "boss3",
      children: [
        {name: "mister_i",group: "B",value: 10,colname: "level3",},
        {name: "mister_j",group: "A",value: 13,colname: "level3",},
        {name: "mister_k",group: "A",value: 13,colname: "level3",},
        {name: "mister_l",group: "D",value: 25,colname: "level3",},
        {name: "mister_m",group: "D",value: 16,colname: "level3",},
        {name: "mister_n",group: "D",value: 28,colname: "level3",},
      ],
      colname: "level2",
    },
    ],
    name: "CEO",
  };

export { ds_line3, ds_treemap }