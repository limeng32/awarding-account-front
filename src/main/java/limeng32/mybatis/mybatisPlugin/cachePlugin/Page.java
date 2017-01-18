package limeng32.mybatis.mybatisPlugin.cachePlugin;

import java.util.Collection;

public class Page<T> {

	private int pageNo;

	private int maxPageNum;

	private int totalCount;

	private Collection<T> pageItems;

	public Page(Collection<T> items, Limitable limitable) {
		pageItems = items;
		pageNo = limitable.getPageNo();
		maxPageNum = limitable.getMaxPageNum();
		totalCount = limitable.getTotalCount();
	}

	public int getPageNo() {
		return pageNo;
	}

	public void setPageNo(int pageNo) {
		this.pageNo = pageNo;
	}

	public int getMaxPageNum() {
		return maxPageNum;
	}

	public void setMaxPageNum(int maxPageNum) {
		this.maxPageNum = maxPageNum;
	}

	public int getTotalCount() {
		return totalCount;
	}

	public void setTotalCount(int totalCount) {
		this.totalCount = totalCount;
	}

	public Collection<T> getPageItems() {
		return pageItems;
	}

	public void setPageItems(Collection<T> pageItems) {
		this.pageItems = pageItems;
	}

}
