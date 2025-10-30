import loadData, { DataType } from "@/services/load_data";

interface Layer {
  W: number[][];
  b: number[];
}

interface NeuralNetworkModelData {
    input_size: number;
    hidden_layers: number[];
    output_size: number;
    model: Layer[];
}

export default class NeuralNetwork {
  private input_size?: number;
  private hidden_layers?: number[];
  private output_size?: number;

  private total_layers: number = 0;

  private model?: Layer[];

    constructor() {
        loadData<NeuralNetworkModelData>(DataType.NEURALNETWORK).then((res) => {
            this.input_size = res.input_size;
            this.hidden_layers = res.hidden_layers;
            this.output_size = res.output_size;
            this.model = res.model;
            this.total_layers = res.model.length;
        });
    }

    private dot(A: number[][], B: number[][]): number[][] {
        const rowsA = A.length;
        const colsA = A[0].length;
        const rowsB = B.length;
        const colsB = B[0].length;
        // console.log(`rowsA ${rowsA}`)
        // console.log(`colsA ${colsA}`)
        // console.log(`rowsB ${rowsB}`)
        // console.log(`colsB ${colsB}`)
        const result = Array.from({
            length: rowsA
        },
        () => Array(colsB).fill(0));

        for (let i = 0; i < rowsA; i++) {
            for (let j = 0; j < colsB; j++) {
                for (let k = 0; k < colsA; k++) {
                result[i][j] += A[i][k] * B[k][j];
                }
            }
        }
        return result;
    }

    // Matrix + Bias Addition
    private add(A: number[][], B: number[][]): number[][] {
        return A.map((row, i) => row.map((v, j) => v + (B[i]?.[j] ?? 0)));
    }

    public forward(input: number[][]): { Z: number[][][]; A: number[][][] } {
        console.log(input)
        const Z: number[][][] = [];
        const A: number[][][] = [];

        for (let i = 0; i < this.total_layers; i++) {
            const W = this.model![i].W;
            const b = this.model![i].b.map((v) => [v]); // column vector
            const prevA = i === 0 ? input : A[i - 1];

            const z = this.add(this.dot(W, prevA), b);
            console.log(z)
            Z.push(z);

            const a = i === this.total_layers - 1 ? this.softmax(z) : this.relu(z);
            console.log(this.softmax(z))
            A.push(a);
        }

        return { Z, A };
    }

    // ReLU
    private relu(x: number[][]): number[][] {
        return x.map((row) => row.map((v) => Math.max(0, v)));
    }

    // Softmax
    private softmax(x: number[][]): number[][] {
    const flat = x.map(row => row[0]); // 10x1 → 1D Array
    const maxVal = Math.max(...flat);   // für numerische Stabilität
    const exp = flat.map(v => Math.exp(v - maxVal));
    const sumExp = exp.reduce((a,b) => a+b, 0);
    const result = exp.map(v => [v / (sumExp || 1e-12)]); // wieder 10x1
    return result;
}
}