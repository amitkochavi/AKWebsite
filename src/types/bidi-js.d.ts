declare module "bidi-js" {
  export type BaseDirection = "ltr" | "rtl" | "auto";

  export interface EmbeddingLevels {
    levels: Uint8Array;
    paragraphs: { start: number; end: number; level: number }[];
  }

  export interface Bidi {
    getEmbeddingLevels(
      text: string,
      baseDirection?: BaseDirection,
    ): EmbeddingLevels;
    getReorderSegments(
      text: string,
      embeddingLevels: EmbeddingLevels,
      start?: number,
      end?: number,
    ): [number, number][];
    getReorderedIndices(
      text: string,
      embeddingLevels: EmbeddingLevels,
    ): number[];
    getReorderedString(
      text: string,
      embeddingLevels: EmbeddingLevels,
    ): string;
  }

  export default function bidiFactory(): Bidi;
}
