/**
 * Serviço de cache para otimizar chamadas de API
 * Implementa um sistema de cache em memória com expiração para reduzir chamadas desnecessárias
 */

type CacheItem<T> = {
  data: T;
  timestamp: number;
  expiresAt: number;
};

class CacheService {
  private cache: Map<string, CacheItem<any>> = new Map();
  private defaultTTL = 5 * 60 * 1000; // 5 minutos em milissegundos

  /**
   * Obtém um item do cache ou executa a função para buscá-lo
   * @param key Chave única para o item no cache
   * @param fetchFn Função que busca os dados caso não estejam em cache
   * @param ttl Tempo de vida do cache em milissegundos (opcional)
   * @returns Dados armazenados ou recém-buscados
   */
  async getOrFetch<T>(key: string, fetchFn: () => Promise<T>, ttl?: number): Promise<T> {
    const now = Date.now();
    const cachedItem = this.cache.get(key);

    // Se o item existe e não expirou, retorna do cache
    if (cachedItem && cachedItem.expiresAt > now) {
      console.log(`[Cache] Usando dados em cache para: ${key}`);
      return cachedItem.data;
    }

    // Caso contrário, busca novos dados
    try {
      console.log(`[Cache] Buscando novos dados para: ${key}`);
      const data = await fetchFn();
      
      // Armazena no cache
      this.cache.set(key, {
        data,
        timestamp: now,
        expiresAt: now + (ttl || this.defaultTTL)
      });
      
      return data;
    } catch (error) {
      // Se houver erro e tivermos dados em cache, mesmo expirados, usamos como fallback
      if (cachedItem) {
        console.log(`[Cache] Erro ao buscar dados, usando cache expirado para: ${key}`);
        return cachedItem.data;
      }
      throw error;
    }
  }

  /**
   * Invalida um item específico do cache
   * @param key Chave do item a ser invalidado
   */
  invalidate(key: string): void {
    this.cache.delete(key);
  }

  /**
   * Invalida todo o cache
   */
  invalidateAll(): void {
    this.cache.clear();
  }

  /**
   * Atualiza o TTL padrão do cache
   * @param ttl Novo TTL em milissegundos
   */
  setDefaultTTL(ttl: number): void {
    this.defaultTTL = ttl;
  }
}

// Exporta uma instância única do serviço de cache
export const cacheService = new CacheService();